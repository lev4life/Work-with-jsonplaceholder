<template>
  <div>
    <my-title>Пост № {{ $route.params.id }}</my-title>
    <form @submit.prevent>
      <select v-model="selectedUserId">
        <option :value="user.id" v-for="user in users" :key="user.id">
          {{ user.name }}
        </option>
        <option value="nobody">Господин никто</option>
      </select>
      {{ selectedUserId }}
    </form>
    <div v-for="comment in comments" :key="comment">
      <div><strong>Пользователь:</strong>{{ comment.user }}</div>
      <div><strong>Название:</strong>{{ comment.name }}</div>
      <div><strong>Email:</strong>{{ comment.email }}</div>
      <div><strong>Описание:</strong>{{ comment.body }}</div>
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
      comments: [],
      users: [],
      user: "",
      name: "",
      email: "",
      body: "",
      selectedUserId: "nobody",
    };
  },
  methods: {
    async createComment() {
      if (this.selectedUserId === "nobody") {
        return;
      }
      try {
        const response = await axios.comment(
          "https://jsonplaceholder.typicode.com/comments",
          { user: this.user, name: this.name, email: this.email, body: this.body, userId: this.selectedUserId }
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
    async fetchComments(userId) {
      const url = userId
        ? "https://jsonplaceholder.typicode.com/comments" + `?postId=${userId}`
        : "https://jsonplaceholder.typicode.com/comments";

      try {
        const response = await axios.get(url);
        setTimeout(() => {
          this.comments = response.data;
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
    await this.fetchComments();
    await this.fetchUsers();
    console.log(this.users);
  },
  watch: {
    selectedUserId: async function (val) {
      if (val === "nobody") {
        await this.fetchComments();
      } else {
        await this.fetchComments(val);
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
