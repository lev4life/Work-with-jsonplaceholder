<template>
  <div>
    <my-title>Посты</my-title>
    <form class="form" @submit.prevent>
      <div>
        <h4>Выбрать пользователя:</h4>
        <UserSelect @input="createPost" />
      </div>
      <div>
        <h4>Добавить пост:</h4>
        <my-button class="btn" @click="showDialog">Создать</my-button>
      </div>

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

    <div v-if="posts.length > 0">
      <!-- <my-button class="btn2" @click="fetchPosts">Получить посты</my-button> -->
      <div
        class="posts"
        v-for="post in posts"
        :key="post"
        @click="$router.push(`/posts/${post.id}`)"
      >

        <div><strong>Пользователь: </strong>{{ getUserNameById(post.userId) }}</div>
        <div><strong>Название: </strong>{{ post.title }}</div>
        <div><strong>Описание: </strong>{{ post.body }}</div>
        <hr class="hr" />
      </div>
    </div>
    <h4 class="message" v-else>Список постов пуст. Выберите пользователя.</h4>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
import MyTitle from "@/UI/MyTitle.vue";
import UserSelect from "@/UI/UserSelect.vue";
export default {
  components: { MyInput, MyButton, MyTitle, UserSelect },

  computed: {
    ...mapState({
      selectedUserId: (state) => state.selectedUserId,
    }),
    ...mapGetters(["getUserNameById"]),
  },

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
    setSelected(event) {
      this.setSelectedUser(event.target.value);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async createPost() {
      try {
        if (this.selectedUserId === "nobody") {
          return;
        }
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          { title: this.title, body: this.body, userId: this.selectedUserId }
        );
        console.log(response);
        await this.fetchPosts(this.selectedUserId);
      } catch (e) {
        alert("Ошибка");
      }
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
        }, 1000);
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  watch: {
    selectedUserId: {
      immediate: true,
      async handler(newVal) {
        if (newVal === "nobody") {
          await this.fetchPosts();
        } else {
          await this.fetchPosts(newVal);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  left: 0;
  width: 120px;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inp {
  width: 180px;
  display: flex;
  margin: 10px 0px;
}

.btn1 {
  width: 125px;
  margin-bottom: 10px;
}

.hr {
  margin: 20px 0;
  box-shadow: 1px 1px 2px grey;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: #fd974f;
}

.posts {
  padding: 10px 10px 0px 10px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fd974f;
    border-radius: 12px;
    box-shadow: 0px 0px 30px #fd974f;
  }
}
</style>
