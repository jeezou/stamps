<template>
  <div class="members">
    <h2>
      Отчет по коллекции
    </h2>
    <h4>
      Тем: {{themes.length}}
      Стран: {{countries}}
      Страниц: {{pages}}
    </h4>

    <section v-for="theme in themes" :key="theme.name">
      <h3 class="table-info" >
        Тема '{{theme.name}}'
      </h3>
      <Table :columns="columns" :tableData="theme.tableData"/>
    </section>


  </div>
</template>

<script>
const axios = require('axios')
import Table from '@/components/Table'

export default {
  name: 'Report',
  components: {Table},
  data () {
    return {
      themes: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'country', title: 'Страна'}, 
        {name:'amount', title: 'Количество марок'} 
      ],
      countries: 0,
      pages: 0,
    }
  },
  mounted () {
    this.get_report()
  },
  methods: {
    get_report: function(){
      axios.get("http://localhost:5000/get_report")
      .then(response => {
        if(response.data.data){
          console.log(response.data.data)
          this.themes = response.data.data.table
          this.pages = response.data.data.pages
          this.countries = response.data.data.countries
        }
      });
    }
  }
}
</script>