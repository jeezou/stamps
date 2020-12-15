<template>
  <div id="app">
    <div id="buttons">
    <header>Stamp Collection</header>
      <div class="button" :class="tab[0]" @click="change_tab(0)" title="Марки каких стран содержатся в данной теме">Список стран в темах</div>
      <div class="button" :class="tab[1]" @click="change_tab(1)" title="В каком томе коллекции находится марка определенной серии">Найти том по серии</div>
      <div class="button" :class="tab[2]" @click="change_tab(2)" title="В каких местах коллекции находятся марки указанной темы">Положение марки в теме</div>
      <div class="button" :class="tab[3]" @click="change_tab(3)" title="Какие темы у серий, включающих марки определенного размера">Поиск тем по размерам марки</div>
      <div class="button" :class="tab[4]" @click="change_tab(4)" title="Марка какой страны находится в данном месте">Поиск марки по параметрам</div>
      <div class="button" :class="tab[5]" @click="change_tab(5)" title="Добавление марки новой темы">Добавление марки новой темы</div>
      <div class="button" :class="tab[6]" @click="change_tab(6)" title="Удаление всех марок одной темы">Удаление темы</div>
      <div class="button" :class="tab[7]" @click="change_tab(7)" title="Изменение места расположения марки в коллекции">Перемещение марки</div>
      <div class="button" :class="tab[8]" @click="change_tab(8)" title="Получение справки по теме">Справка по странам из темы</div>
      <div class="button" :class="tab[9]" @click="change_tab(9)" title="Получение отчета по коллекции">Отчет по коллекции</div>
    </div>
    <main>
      <Countries v-if="tab[0] == 'primary'"/>
      <Volumes v-if="tab[1] == 'primary'"/>
      <Location v-if="tab[2] == 'primary'"/>
      <SerialThemes v-if="tab[3] == 'primary'"/>
      <SearchStamp v-if="tab[4] == 'primary'"/>
      <Add v-if="tab[5] == 'primary'" @sent="refreshAdd()"/>
      <RemoveTheme v-if="tab[6] == 'primary'" @remove="refreshAdd()"/>
      <MoveStamp v-if="tab[7] == 'primary'"/>
      <Reference v-if="tab[8] == 'primary'"/>
      <Report v-if="tab[9] == 'primary'"/>
    </main>
  </div>
</template>

<script>
import Countries from './components/Countries'
import Volumes from './components/Volumes'
import Location from './components/Location'
import SerialThemes from './components/SerialThemes'
import SearchStamp from './components/SearchStamp'
import Add from './components/Add'
import RemoveTheme from './components/RemoveTheme'
import MoveStamp from './components/MoveStamp'
import Reference from './components/Reference'
import Report from './components/Report'


export default {
  name: 'App',
  components: {
    Countries,
    Volumes,
    Location,
    SerialThemes,
    SearchStamp,
    Add,
    RemoveTheme,
    MoveStamp,
    Reference,
    Report
  },
  data () {
    return {
      tab:[ 'primary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary']
    }
  },
  methods: {
    change_tab: function (index) {
      let tab = ['secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary', 'secondary']
      tab[index] = 'primary'
      this.tab = tab
    },
    refreshAdd: function () {
      this.change_tab(6);
      setTimeout(() => {
        this.change_tab(5);
      });
    }, 
    refreshRemove: function () {
      this.change_tab(5);
      setTimeout(() => {
        this.change_tab(6);
      });
    } 
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500&display=swap');
:root{
  --primary: #7e7e7e66;
  --primary-hover: #45454566;
  --background: #ededed;
  --light: #ffffffee;
  --secondary: #ededed;
  --sky: #0091cf;
  --dark: #01395e;
  --text: #1c2329;
  --light-text: #666464;
}
.error-message{
  margin: 10px 0;
  text-align: center;
  color: brown;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
    font-family: 'Comfortaa', cursive, sans-serif;
}
body{
  /* background: var(--background); */
  background: url('./assets/bg2.jpg');
  background-position: cover;

}
main{
  position: absolute;
  padding: 0px;
  margin-left: 400px;
  width: calc(100% - 400px);
  height:100vh;
}

header{
  line-height: 200px;
  text-align: center;
  background: var(--primary);
  color: var(--light);
  text-shadow: 0 0 60px rgba(0,0,0,1);
  padding: 0px 5px;
  font-weight: 400;
  font-size: 2.1em;     
  width:100%;
}

.primary {
    background: var(--primary-hover); /*#CC95C0*/
    color: var(--light);  
}

.secondary {
    /* background: var(--secondary); #7AA1D2 */
    color: var(--light-text);
}

#buttons{
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.1em;
  background: var(--light);
  user-select: none;
  width: 400px;
  height: 100vh;
  position: fixed;
  box-shadow: 0 0 20px rgba(0,0,0,.3);
}
.button{
    display: block;
    line-height: 30px;
    padding: 5px 10px;
    transition: all .2s ease;
    cursor: pointer;
    width:100%;
    font-size: 1.1em;
}
.button:hover{
    background: var(--primary-hover);
    color: var(--light);
}

#buttons>.button:nth-child(7),
#buttons>.button:nth-child(10){
  border-top: 2px dashed var(--primary-hover);
}





.form-button{
  width:fit-content;
  margin: 10px auto;
  background:var(--primary);
}

form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 20px 0;
    font-family: 'Comfortaa', cursive, sans-serif;
    font-weight: 300;
    background: var(--light);
    width: fit-content;
    padding: 5px 20px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0,.15);
  }
  .primary:hover{
      background: var(--primary-hover);  
  }

  input,
  select,
  textarea {
    font-weight: 200;
    grid-area: input;
    font-size: 1.1em;
    display: inline-block;
    width: 300px;
    max-width: 300px;
    min-width: 300px;
    min-height: 30px;
    height:30px;
    margin: 10px auto;
    padding: 3px 5px;
    border-radius: 4px;
    background: var(--light);
    border-bottom:1px solid var(--primary-hover);
  }
  label {
    padding: 3px 5px;
    grid-area: label;
    font-size: 1.1em;
    margin: 10px auto;
  }
  .input-container{
    width:700px;
    margin: 0;
    display: grid;
    align-items: center;
    grid-template-areas: 'label input';
    justify-content: space-between;
  }

  #save_changes,
  #search {
    width: 130px;
    font-size: 1.1em;
    margin: 15px 0;
    background: var(--primary);
    text-shadow: 0 0 2px rgba(0,0,0,.2);
    color: #fff;
  }
  #save_changes:hover,
  #search{
    background:var(--primary-hover);
  }
  .astra{
    color:brown
  }
  h2, h4{
    font-weight: normal;
  }

  h2{
    margin-top:15px;
    font-size: 2em;
  }
  h4{
    margin-top:15px;
    font-size: 1.3em;
    margin-bottom:60px;
  }

  table{
    width:fit-content;
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0,.15);
    line-height: 30px;
    font-family: 'Comfortaa', cursive, sans-serif;
    font-weight: 400;
    background: var(--light);
  }
  thead th{
    text-align: left;
    padding: 5px 7px;
    font-weight: 600;
    color: var(--text);
  }
  tbody tr{
    border-top:1px solid #eee;
    cursor: default;
  }
  tbody td{
    color: var(--light-text);
    padding: 5px 7px;
  }

  .members{
    padding:50px;
    background: rgba(255,255,255,.8);
    height:100vh;
    overflow: auto;
  }

  #dark{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,.7);
  }
  #success{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width:400px;
    padding:20px 10px 10px 10px;
    background: var(--light) ;
    text-align: center;
  }
  .ok-button{
    width:fit-content;
    margin: 10px auto;
    background:green;
    color: var(--light);
  }
</style>
