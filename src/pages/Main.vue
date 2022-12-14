<template>
  <div>
    <my-title>Добро пожаловать!</my-title>
   <h4>Наши лучшие пользователи:</h4>
    <div>
      <div
        class="users"
        v-for="user in users"
        :key="user.id"

      >
        <div><strong>Пользователь:</strong>{{ user.name}}</div>
        <div><strong>Имя:</strong>{{ user.username}}</div>
        <div><strong>Эл. почта:</strong>{{ user.email }}</div>
        <div><strong>Телефон:</strong>{{ user.phone }}</div>
        <div><strong>Вебсайт:</strong>{{ user.website }}</div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
import MyTitle from "@/UI/MyTitle.vue";
export default {
  components: { MyInput, MyButton, MyTitle },

  data() {
    return {
      posts: [],
      users: [],
      // user: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      selectedUserId: "nobody",
    };
  },
  methods: {
    async createPost() {
      if (this.selectedUserId === "nobody") {
        return;
      }
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          { name: this.name, username: this.username, email: this.email, phone: this.phone, website: this.website, userId: this.selectedUserId }
        );
        console.log(response);
        await this.fetchPosts(this.selectedUserId);
      } catch (e) {
        alert("Ошибка");
      }
      // this.user = "";
      this.title = "";
      this.body = "";
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
    await this.fetchPosts();
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

.users {
  margin: 10px 0px;

}
</style>
