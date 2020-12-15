<template>
  <div class="members">
    <h2 >
      Поиск тома по серии
    </h2>
    <h4 >
      В каком томе коллекции находится марка определенной серии
    </h4>
     <form autocomplete="off" spellcheck="false">

      <div class="input-container">
        <label for="seria_selection">Веберите серию <span class="astra">*</span></label>
        <select id="seria_selection" @change="refresh_table()" v-model="seria" required>
          <option v-for="(seria) in serias" :key="seria.name" :value="seria.name">
            {{seria.name}}
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
  name: 'Members',
  components:{Table},
  data () {
    return {
      serias: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'theme', title: 'Тема'}, 
        {name:'stamp_theme', title: 'Тема марки'}, 
        {name:'volume', title: 'Номер тома'}, 
        {name:'serial_number', title: 'Серия марки'}
      ],
      tableData: [],
      seria: null
    };
  },
  mounted() {
    this.get_serias()
    this.refresh_table()
    setInterval(() => {
      this.refresh_table()
    }, 2000);
  },
  methods: {
    refresh_table: function(){
      axios.get(`http://localhost:5000/volumes`, {params: {seria: this.seria}})
      .then((response) => {
        this.tableData = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },
    get_serias: function(){
      axios.get(`http://localhost:5000/get_serias`)
      .then((response) => {
        this.serias = response.data.data
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
