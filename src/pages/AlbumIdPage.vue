<template>
    <div>
      <my-title>Альбом № {{ $route.params.id }}</my-title>
      <form @submit.prevent>
        <select v-model="selectedUserId">
          <option :value="user.id" v-for="user in users" :key="user.id">
            {{ user.name }}
          </option>
          <option value="nobody">Господин никто</option>
        </select>
        {{ selectedUserId }}
      </form>
      <div v-for="album in albums" :key="album.id">
        <div><strong>Пользователь:</strong>{{ album.user }}</div>
        <div><strong>Название:</strong>{{ album.title }}</div>
        <div><strong>Адрес:</strong>{{ album.url }}</div>
        <div><strong>Адрес миниатюры:</strong>{{ album.thumbnailUrl }}</div>
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import MyInput from "@/UI/MyInput.vue";
  import MyButton from "@/UI/MyButton.vue";
  export default {
    components: { MyInput, MyButton },
  
    data() {
      return {
        albums: [],
        users: [],
        user: "",
        title: "",
        url: "",
        thumbnailUrl: "",
        selectedUserId: "nobody",
      };
    },
    methods: {
      async createAlbum() {
        if (this.selectedUserId === "nobody") {
          return;
        }
        try {
          const response = await axios.album(
            "https://jsonplaceholder.typicode.com/photos",
            { user: this.user, title: this.title, url: this.url, thumbnailUrl: this.thumbnailUrl }
          );
          console.log(response);
          await this.fetchAlbums(this.selectedUserId);
        } catch (e) {
          alert("Ошибка");
        }
        // this.user = "";
        this.user = "";
        this.body = "";
        //fetchComments
        //mount(){fetchComments}
      },
      async fetchAlbums(userId) {
        const url = userId
          ? "https://jsonplaceholder.typicode.com/photos" + `?albumId=${userId}`
          : "https://jsonplaceholder.typicode.com/photos";
  
        try {
          const response = await axios.get(url);
          setTimeout(() => {
            this.albums = response.data;
            console.log(response);
          }, 2000);
        } catch (e) {
          alert("Ошибка");
        }
      },
      async fetchUsers() {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setTimeout(() => {
            this.users = response.data;
            console.log(response);
          }, 1000);
        } catch (e) {
          alert("Ошибка");
        }
      },
    },
    async mounted() {
      await this.fetchAlbums();
      await this.fetchUsers();
      console.log(this.users);
    },
    watch: {
      selectedUserId: async function (val) {
        if (val === "nobody") {
          await this.fetchAlbums();
        } else {
          await this.fetchAlbums(val);
        }
      },
    },
  }
  
  </script>
  
  <style>
  .inp {
    margin: 10px 0px;
  }
  .btn {
    margin-bottom: 10px;
  }
  </style>
  