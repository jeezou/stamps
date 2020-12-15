<template>
  <div class="members">
    <h2>
      Добавление марки новой темы
    </h2>
    <h4>
     Добавление марки новой темы
    </h4>
    <form autocomplete="off" spellcheck="false" @submit="$event.preventDefault()">
      <div class="input-container">
        <label for="theme">Укажите тему <span class="astra">*</span></label>
        <input id="theme" type="text" v-model="theme" required>
      </div>
      <p class="error-message" v-if="!is_correct_theme">Такая тема уже есть</p>
      <div class="input-container">
        <label for="produce_country">Укажите страну производителя<span class="astra">*</span></label>
        <input id="produce_country" type="text" v-model="produce_country" required>
      </div>
      <div class="input-container">
        <label for="serial_number">Укажите серийный номер <span class="astra">*</span></label>
        <input id="serial_number" type="text" v-model="serial_number" required>
      </div>
      <div class="input-container">
        <label for="serial_theme">Укажите тему серии <span class="astra">*</span></label>
        <input id="serial_theme" type="text" v-model="serial_theme" required>
      </div>
      <div class="input-container">
        <label for="year">Укажите год выпуска <span class="astra">*</span></label>
        <input id="year" type="number" v-model="year" required>
      </div>
      <div class="input-container">
        <label for="color">Укажите цвет марки <span class="astra">*</span></label>
        <input id="color" type="text" v-model="color" required>
      </div>
      <div class="input-container">
        <label for="size">Укажите размер марки<span class="astra">*</span></label>
        <input id="size" type="text" v-model="size" required>
      </div>
      <div class="input-container">
        <label for="price">Укажите цену марки<span class="astra">*</span></label>
        <input id="price" type="number" v-model="price" required>
      </div>
      <div class="input-container">
        <label for="stamp_theme">Укажите тему марки<span class="astra">*</span></label>
        <input id="stamp_theme" type="text" v-model="stamp_theme" required>
      </div>
      <p class="error-message" v-if="null_fields">Не все поля заполнены</p>
      <button @click="add($event)" class="button form-button">Добавить марку</button>
    </form>
    <div id="dark" v-show="success">
      <div id="success">  
        Марка на новую тему успешно добавлена
        <div class="button ok-button" @click="times()">OK</div>
      </div>   
    </div> 
  </div>
</template>

<script>
const axios = require('axios')
import Table from '@/components/Table'

export default {
  name: 'add',
  components: {Table},
  data () {
    return {
      null_fields: false,
      is_correct_theme: true,
      themes: [],
      columns: [
        {name:'id', title: '#'}, 
        {name:'country', title: 'Страна производитель'}, 
        {name:'theme', title: 'Тема'} 
      ],
      success: false,
      theme: null,
      produce_country: null,
      serial_number: null,
      serial_theme: null,
      year: null,
      color: null,
      size: null,
      price: null,
      stamp_theme: null
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

    times: function(){
      this.success = false  
      this.$emit('sent')
    },

    add: function(event){
      event.preventDefault();
      for(let i = 0; i < this.themes.length; i++){
        if(this.themes[i].name == this.theme){
          this.is_correct_theme = false;
          return;
        }
        else {
          this.is_correct_theme = true;
        }
      }
      if(this.is_correct_theme && this.theme && this.produce_country && this.serial_number && this.serial_theme && this.year && this.color && this.size && this.price && this.stamp_theme){
        this.null_fields = false
        let stamp_info = {
          theme: this.theme,
          produce_country: this.produce_country,
          serial_number: this.serial_number,
          serial_theme: this.serial_theme,
          year: this.year,
          color: this.color,
          size: this.size,
          price: this.price,
          stamp_theme: this.stamp_theme,
          page: 1,
          position: 1
        }
        axios.post("http://localhost:5000/add", stamp_info)
        .then(response => {
          if(response.data.error){
            alert('Произошла ошибка')
          }else{
            this.success = true
          }
        });
      }else{
        this.null_fields = true
      }
    }
  }
}
</script>