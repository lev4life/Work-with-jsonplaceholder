<template>
  <div>
    <my-title>Альбом</my-title>
    <form>
      <div>
        <h4>Выберите пользователя:</h4>
      <my-select @input="setSelected" :value="selectedUserId">
        <option :value="user.id" v-for="user in users" :key="user.id">
        {{user.name}}
        </option>
        <option value="nobody">Господин никто</option>
      </my-select>
</div>
      
    </form>
    <div v-if="albums.length > 0">
      <div
        class="albums"
        v-for="album in albums"
        :key="album"
        @click="$router.push(`/albums/${album.id}`)"
      >
        <div><strong>Пользователь: </strong>{{ album.userId }}</div>
        <div><strong>Номер: </strong>{{ album.id }}</div>
        <div><strong>Название: </strong>{{ album.title }}</div>
        <hr class="hr" />
      </div>
      </div>
      <h4 class="message" v-else>Список постов пуст. Выберите пользователя.</h4>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from "axios";
import MyTitle from '@/UI/MyTitle.vue'
export default {
  components: { MyTitle },
  computed: mapState({
    selectedUserId: state => state.selectedUserId,
    
  }),

data() {
  return {
    albums: [],
    users: [],
    id: "",
    title: "",
  }
},
methods: {
  ...mapMutations([
     'setSelectedUser'
  ]),
   setSelected(event){
    this.setSelectedUser(event.target.value)
   },
  async createAlbum() {
    if (this.selectedUserId === "nobody") {
        return;
      }
      try{
        const response = await axios.post(
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
    await this.fetchAlbums(this.selectedUserId);
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

<style lang="scss">


.hr{
margin: 20px 0;
box-shadow: 1px 1px 2px grey;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: #fd974f;
}

.albums{
  padding: 10px 10px 0px 10px;
  transition: 0.3s;
  cursor:pointer;

  &:hover{
    background-color: #fd974f;
    border-radius: 12px;
    box-shadow: 0px 0px 30px #fd974f;
}
}
</style>