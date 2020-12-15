



<template>
  <div class="members">
    <h2>
      Поиск тем серий по размерам марки
    </h2>
    <h4>
      Какие темы у серий, включающих марки определенного размера
    </h4>
     <form autocomplete="off" spellcheck="false">

      <div class="input-container">
        <label for="size_selection">Веберите размер <span class="astra">*</span></label>
        <select id="size_selection" @change="refresh_table()" v-model="size" required>
          <option v-for="size in sizes" :key="size.name" :value="size.name">
            {{size.name}}
          </option>
        </select>
      </div>
    </form>
    <Table :tableData="tableData" :columns="columns"/>
  </div>
</template>

<script>
import Table from "@/components/Table"
const axios = require('axios')

export default {
  name: 'SearchStamp',
  components:{Table},
  data () {
    return {
      sizes: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'serial_theme', title: 'Тема серии'}, 
        {name:'stamp_theme', title: 'Тема марки'}, 
        {name:'serial_number', title: 'Серия марки'}, 
        {name:'size', title: 'Размер марки'}, 
      ],
      tableData: [],
      size: null
    };
  },
  mounted() {
    this.get_sizes()
    this.refresh_table()
    setInterval(() => {
      this.refresh_table()
    }, 2000);
  },
  methods: {
    refresh_table: function(){
      axios.get(`http://localhost:5000/serial_themes`, {params: {size: this.size}})
      .then((response) => {
        this.tableData = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },
    get_sizes: function(){
      axios.get(`http://localhost:5000/get_sizes`)
      .then((response) => {
        this.sizes = response.data.data
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
