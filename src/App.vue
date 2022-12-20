<template>
    <navbar></navbar>
  <div class="app">
    <my-title></my-title>
    <router-view></router-view>
    <my-dialog :v-show="true">
    <my-input></my-input>
    <my-button></my-button>
    </my-dialog>
  </div>
</template>

<script>
import Navbar from "@/UI/Navbar.vue"
import {mapMutations} from "vuex"
import axios from "axios"

export default {
components: {
  Navbar
},
  methods: {
    ...mapMutations(['setUsers']),
    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setTimeout(() => {
          console.log('dasfdfsa', response.data);
          this.setUsers(response.data);
        }, 1000);
      } catch (e) {
        console.log('dsadasdas', e);
        alert("Ошибка");
      }
    },
  },
  async mounted() {
    await this.fetchUsers();
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
*{
  font-family: 'Fredericka the Great', sans-serif;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.app{
  padding: 20px;
}
</style>