<template>
  <div class="members">
    <h2 >
      Тезисы по городам
    </h2>
    <h4 >
     Вывести тезисы докладов, поступивших из указанного города
    </h4>
    <form>
      <div class="input-container">
        <label for="city">Город <span class="astra">*</span></label>
        <select id="city" @change="refresh_table()" v-model="city">
            <option value="null" selected>Не выбрано</option>
            <option :value="city.name" v-for="city in cities" :key="city.name">{{city.name}}</option>
        </select>
      </div>
    </form>
    <Table :columns="columns" :tableData="tableData"/>
  </div>
</template>

<script>
import Table from '@/components/Table'
const axios = require('axios');

export default {
  name: 'FirstMailing',
  components: {Table},
  data () {
    return {
      cities:[],
      columns: [
        {name:'id', title: '#'}, 
        {name:'full_name', title: 'ФИО'}, 
        {name:'thesis', title: 'Тезис'}, 
        {name:'city', title: 'Город'}
      ],
     city: null,
     tableData: []
    };
  },
  mounted() {
    this.getCities();
    setInterval(() => {
      this.getCities();
    }, 2000);
  },
  methods: {
    refresh_table: function(){
      axios.get(`http://localhost:5000/theses`, {params: {city: this.city}})
      .then((response) => {
        this.tableData = response.data.data;
      }).catch()
    },
    getCities: function(){
      axios.get(`http://localhost:5000/get_cities`)
      .then((response) => {
        this.cities = response.data.data
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    }
  }
}
</script>
