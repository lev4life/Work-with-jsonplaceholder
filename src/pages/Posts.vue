<template>
  <div>
    <my-title>Посты</my-title>
    <form @submit.prevent>
      <select @input="setSelected" :value="selectedUserId">
        <option :value="user.id" v-for="user in users" :key="user.id">
          {{ user.name }}
          
        </option>
        <option value="nobody">Господин никто</option>
      </select>
      <h4>Добавить пост:</h4>

      <!-- <my-input
        class="inp"
        :value="user"
        @input="user = $event.target.value"
        type="text"
        placeholder="Введите имя пользователя"
        >Пользователь</my-input
      > -->
        <my-button @click="showDialog">Добавить</my-button>
      <my-dialog v-model:show="dialogVisible">
        <my-input
        class="inp"
        :value="title"
        @input="title = $event.target.value"
        type="text"
        placeholder="Введите название"
        >Название</my-input
      >
      <my-input
        class="inp"
        :value="body"
        @input="body = $event.target.value"
        type="text"
        placeholder="Введите описание"
        >Описание</my-input
      >
      <my-button class="btn1" @click="createPost">Добавить пост</my-button>
      </my-dialog>
      
    </form>
    <div>
      <!-- <my-button class="btn2" @click="fetchPosts">Получить посты</my-button> -->
      <div
        class="posts"
        v-for="post in posts"
        :key="post"
        @click="$router.push(`/posts/${post.id}`)"
      >
        <div><strong>Пользователь:</strong>{{ post.userId }}</div>
        <div><strong>Название:</strong>{{ post.title }}</div>
        <div><strong>Описание:</strong>{{ post.body }}</div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from "axios";
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
import MyTitle from "@/UI/MyTitle.vue";
export default {
  components: { MyInput, MyButton, MyTitle },

  computed: mapState({
    selectedUserId: state => state.selectedUserId,
    
  }),

  data() {
    return {
      posts: [],
      users: [],
      dialogVisible: false,
      // user: "",
      title: "",
      body: "",
    };
  },
  methods: { 
    ...mapMutations([
     'setSelectedUser'
  ]),
   setSelected(event){
    this.setSelectedUser(event.target.value)
   },
   showDialog(){
    this.dialogVisible = true;
   },
    async createPost() {
      if (this.selectedUserId === "nobody") {
        return;
      }
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          { title: this.title, body: this.body, userId: this.selectedUserId }
        );
        console.log(response);
        await this.fetchPosts(this.selectedUserId);
      } catch (e) {
        alert("Ошибка");
      }
      // this.user = "";
      this.title = "";
      this.body = "";
      this.dialogVisible = false;
    },
    async fetchPosts(userId) {
      const url = userId
        ? "https://jsonplaceholder.typicode.com/posts" + `?userId=${userId}`
        : "https://jsonplaceholder.typicode.com/posts";

      try {
        const response = await axios.get(url);
        setTimeout(() => {
          this.posts = response.data;
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
    await this.fetchPosts(this.selectedUserId);
    await this.fetchUsers();
    console.log(this.users);
  },
  watch: {
    selectedUserId: async function (val) {
      if (val === "nobody") {
        await this.fetchPosts();
      } else {
        await this.fetchPosts(val);
      }
    },
  },
};
</script>

<style>
.inp {
  width: 180px;
  display: flex;
  margin: 10px 0px;
}

.btn1 {
  width: 180px;
  margin-bottom: 10px;
}

.posts {
  cursor: pointer;
}
</style>
