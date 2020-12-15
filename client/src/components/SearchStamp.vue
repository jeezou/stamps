<template>
  <div class="members">
    <h2>
      Поиск марки по параметрам
    </h2>
    <h4>
      Марка какой страны находится в данном месте
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
  </div>
</template>

<script>
import Table from "@/components/Table"
const axios = require('axios')

export default {
  name: 'SerialThemes',
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
      position: null
    };
  },
  mounted() {
    this.get_themes()
  },
  methods: {
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
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>