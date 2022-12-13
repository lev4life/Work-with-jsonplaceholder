<template>
  <div>
    <my-title>Посты</my-title>
    <form @submit.prevent>
      <my-input class="inp" :value="user" @input="user = $event.target.value" type="text" placeholder="Введите имя пользователя"
        >Пользователь</my-input
      >
      <my-input class="inp" :value="title" @input="title = $event.target.value" type="text" placeholder="Введите название"
        >Название</my-input
      >
      <my-input class="inp" :value="body" @input="body = $event.target.value" type="text" placeholder="Введите описание"
        >Описание</my-input
      >
      <my-button class="btn1" @click="createPost">Добавить пост</my-button>
    </form>
    <div>
      <my-button class="btn2" @click="fetchPosts">Получить посты</my-button>
      <div
        class="posts"
        v-for="post in posts"
        :key="post"
        @click="$router.push(`/posts/${post.id}`)"
      >
        <div><strong>Пользователь:</strong>{{ post.user }}</div>
        <div><strong>Название:</strong>{{ post.title }}</div>
        <div><strong>Описание:</strong>{{ post.body }}</div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
import MyTitle from '@/UI/MyTitle.vue';
export default {
  components: { MyInput, MyButton, MyTitle },

  data() {
    return {
      posts: [],
      user: "",
      title: "",
      body: "",
    };
  },
  methods: {
    createPost() {
     
      const newPost = {
        id: Date.now(),
        user: this.user,
        title: this.title,
        body: this.body
      }
      
      setTimeout(() => {
        this.posts.push(newPost);
      })
    },
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        setTimeout(() => {
          this.posts = response.data;
          console.log(response);
        }, 2000);
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
};
</script>

<style>
.inp{
  width: 180px;
  display: flex;
  margin-top: 10px;

}

.btn1{
  width: 180px;
  margin-top: 10px;
}

.btn2{
  width:30%;
  margin-top: 10px;
  margin-bottom: 10px;
    margin-left: 35%;

}

.posts {
  cursor: pointer;
}
</style>
