<template>
  <div>
    <my-title>Альбом</my-title>
    <form>
      <select v-model="selectedUserId">
        <option :value="user.id" v-for="user in users" :key="user.id">
        {{user.name}}
        </option>
        <option value="nobody">Господин никто</option>
      </select>
      {{selectedUserId}}
    </form>
    <div
        class="albums"
        v-for="album in albums"
        :key="album"
        @click="$router.push(`/albums/${album.id}`)"
      >
        <div><strong>Пользователь:</strong>{{ album.userId }}</div>
        <div><strong>Номер:</strong>{{ album.id }}</div>
        <div><strong>Название:</strong>{{ album.title }}</div>
        <hr />
      </div>
  </div>
</template>

<script>
import axios from "axios";
import MyTitle from '@/UI/MyTitle.vue'
export default {
  components: { MyTitle },
data() {
  return {
    albums: [],
    users: [],
    id: "",
    title: "",
    selectedUserId: "nobody",
  }
},
methods: {
  async createAlbum() {
    if (this.selectedUserId === "nobody") {
        return;
      }
      try{
        const response = await axios.album(
          "https://jsonplaceholder.typicode.com/albums",
          { id: this.id, title: this.title, userId: this.selectedUserId }
        );
        console.log(response);
        await this.fetchPosts(this.selectedUserId)
      } catch (e) {
        alert("Ошибка");
      }
      // this.user = "";
      this.title = "";
    },
    async fetchAlbums(userId) {
      const url = userId
        ? "https://jsonplaceholder.typicode.com/albums" + `?userId=${userId}`
        : "https://jsonplaceholder.typicode.com/albums";

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
.albums{
  cursor:pointer;
}
</style>