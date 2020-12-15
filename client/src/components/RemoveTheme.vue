<template>
  <div class="members">
    <h2>
      Удаление темы
    </h2>
    <h4>
      Удаление всех марок одной темы
    </h4>
    <form autocomplete="off" spellcheck="false">

      <div class="input-container">
        <label for="theme_selection">Веберите тему <span class="astra">*</span></label>
        <select id="theme_selection" v-model="theme" required>
          <option v-for="(theme) in themes" :key="theme.name" :value="theme.name">
            {{theme.name}}
          </option>
        </select>
      </div>
      <button @click="remove($event)" class="button form-button" v-if="theme">Удалить тему</button>
    </form>

    <div id="dark" v-show="success">
      <div id="success">  
        Тема "{{theme}}" успешно удалена
        <div class="button ok-button" @click="times()">OK</div>
      </div>   
    </div> 
  </div>
</template>

<script>
const axios = require('axios')
import Table from '@/components/Table'

export default {
  name: 'RemoveTheme',
  components: {Table},
  data () {
    return {
      themes: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'country', title: 'Страна производитель'}, 
        {name:'theme', title: 'Тема'} 
      ],
      tableData: [],
      theme: null,
      success: false
    }
  },
  mounted () {
    this.get_themes();
  },
  methods: {
    get_themes: function () {
      axios.get('http://localhost:5000/get_themes')
      .then((response) => {
        this.themes = response.data.data
      })
    },

    remove: function(event){
      event.preventDefault();
      let data = {
        theme: this.theme
      }
      axios.post("http://localhost:5000/remove_theme", data)
      .then(response => {
        if(response.data.error){
          alert('Произошла ошибка')
        }else{
          this.success = true
        }
      });
    },
    
    times: function(){
      this.success = false  
      this.$emit('remove')
    },
  }
}
</script>