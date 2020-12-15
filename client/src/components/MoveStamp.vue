<template>
  <div class="members">
    <h2>
      Перемещение марки
    </h2>
    <h4>
      Изменение места расположения марки в коллекции
    </h4>
     <form autocomplete="off" spellcheck="false">

      <div class="input-container">
        <label for="theme_selection">Веберите тему <span class="astra">*</span></label>
        <select id="theme_selection" @change="got_theme()" v-model="theme" required>
          <option v-for="theme in themes" :key="theme.name" :value="theme.name">
            {{theme.name}}
          </option>
        </select>
      </div>

      <div class="input-container" v-if="theme">
        <label for="volume_selection">Веберите том <span class="astra">*</span></label>
        <select id="volume_selection" @change="got_volume()" v-model="volume" required>
          <option v-for="volume in volumes" :key="volume.name" :value="volume.name">
            {{volume.name}}
          </option>
        </select>
      </div>

      <div class="input-container" v-if="volume">
        <label for="page_selection">Веберите страницу <span class="astra">*</span></label>
        <select id="page_selection" @change="got_page()" v-model="page" required>
          <option v-for="page in pages" :key="page.name" :value="page.name">
            {{page.name}}
          </option>
        </select>
      </div>

      <div class="input-container" v-if="page">
        <label for="position_selection">Веберите позицию <span class="astra">*</span></label>
        <select id="position_selection" @change="refresh_table()" v-model="position" required>
          <option v-for="position in positions" :key="position.name" :value="position.name">
            {{position.name}}
          </option>
        </select>
      </div>

    </form>

    <Table v-if="theme && volume && page && position" :tableData="tableData" :columns="columns"/>

    <form v-if="theme && volume && page && position" autocomplete="off" spellcheck="false">
      <div class="input-container">
        <label for="theme_selection">Веберите новую тему <span class="astra">*</span></label>
        <select id="theme_selection" v-model="new_theme" required>
          <option v-for="item in new_themes" :key="item.name" :value="item.name">
            {{item.name}}
          </option>
        </select>
      </div>
      <button @click="move($event)" class="button form-button" v-if="new_theme">Переместить</button>
    </form>
    <div id="dark" v-show="success">
      <div id="success">  
        Марка успешно перемещена
        <div class="button ok-button" @click="times()">OK</div>
      </div>   
    </div> 
  </div>
</template>

<script>
import Table from "@/components/Table"
const axios = require('axios')

export default {
  name: 'MoveStamp',
  components:{Table},
  data () {
    return {
      themes: [],
      volumes: [],
      pages: [],
      positions: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'country', title: 'Страна производитель'}, 
        {name:'stamp_theme', title: 'Тема марки'}, 
        {name:'size', title: 'Размер'}, 
        {name:'color', title: 'Цвет'}, 
        {name:'price', title: 'Цена'} 
      ],
      tableData: [],
      theme: null,
      volume: null,
      page: null,
      position: null,
      new_theme: null,
      new_themes: [],
      success: false,
    };
  },
  mounted() {
    this.get_themes()
  },
  methods: {

    times: function(){
      this.success = false  
      this.$emit('move')
    },
  
  get_themes: function(){
      axios.get(`http://localhost:5000/get_themes`)
      .then((response) => {
        this.themes = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

    get_volumes: function(){
      axios.get(`http://localhost:5000/get_volumes`, {params: {theme: this.theme}})
      .then((response) => {
        this.volumes = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

    get_pages: function(){
      axios.get(`http://localhost:5000/get_pages`, {params: {theme: this.theme, volume: this.volume}})
      .then((response) => {
        this.pages = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

    get_positions: function(){
      axios.get(`http://localhost:5000/get_positions`, {params: {theme: this.theme, volume: this.volume, page: this.page}})
      .then((response) => {
        this.positions = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

///////////////////////////////////////////////

    got_theme: function(){
      this.volume = null
      this.page = null
      this.position = null
      this.get_volumes()
      
      this.new_themes = this.themes.filter(item => item.name != this.theme)
    },

    got_volume: function(){
      this.page = null
      this.position = null
      this.get_pages()
    },

    got_page: function(){
      this.position = null
      this.get_positions()
    },

    refresh_table: function(){
      axios.get(`http://localhost:5000/search_stamp`, 
      {params: {theme: this.theme, volume: this.volume, page: this.page, position: this.position}})
      .then((response) => {
        this.tableData = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

    move: function(event){
      event.preventDefault();
      if(this.tableData[0].country){        
        let data = {
          theme: this.theme,
          country: this.tableData[0].country,
          volume: this.volume,
          page: this.page,
          position: this.position,
          new_theme: this.new_theme
        }

        axios.post("http://localhost:5000/move_stamp", data)
        .then(response => {
          if(response.data.error){
            alert('Произошла ошибка')
          }else{
            this.success = true
          }
        });
      } 
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>