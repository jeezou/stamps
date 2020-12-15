<template>
  <div class="members">
    <h2 >
      Список стран по темам
    </h2>
    <h4 >
      Марки каких стран содержатся в данном разделе
    </h4>
    <form autocomplete="off" spellcheck="false">

      <div class="input-container">
        <label for="theme_selection">Веберите тему <span class="astra">*</span></label>
        <select id="theme_selection" @change="update_table()" v-model="theme" required>
          <option v-for="(theme) in themes" :key="theme.name" :value="theme.name">
            {{theme.name}}
          </option>
        </select>
      </div>
    </form>
      <Table :columns="columns" :tableData="tableData"/>
  </div>
</template>

<script>
const axios = require('axios')
import Table from '@/components/Table'

export default {
  name: 'Countries',
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
      theme: null
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
    update_table: function(){
      axios.get('http://localhost:5000/countries', {params: {theme: this.theme}})
      .then((response) => {
        this.tableData = response.data.data
      })
      .catch((error) => {
        console.log(`error: ${error}`)
      })
    }
  }
}
</script>