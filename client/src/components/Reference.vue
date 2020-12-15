<template>
  <div class="members">
    <h2>
      Справка по странам из темы
    </h2>
    <h4>
      Получение справки о странах в теме
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
      <button @click="get_reference($event)" class="button form-button" v-if="theme">Получить справку</button>
    </form>

    <Table v-if="tableData.length" :columns="columns" :tableData="tableData"/>

  </div>
</template>

<script>
const axios = require('axios')
import Table from '@/components/Table'

export default {
  name: 'Reference',
  components: {Table},
  data () {
    return {
      themes: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'country', title: 'Страна'}, 
        {name:'amount', title: 'Количество марок'} 
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

    get_reference: function(event){
      event.preventDefault()
      axios.get("http://localhost:5000/get_reference", {params: {theme:this.theme}})
      .then(response => {
        if(response.data.data){
          this.tableData = response.data.data
        }
      });
    }
  }
}
</script>