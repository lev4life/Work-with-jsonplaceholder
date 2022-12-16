<template>
  <div>
    <my-title>Пост № {{ $route.params.id }}</my-title>
    <form @submit.prevent>
      <h4>Добавить комментарий:</h4>
      <my-button @click="showDialog">Добавить</my-button>
      <my-dialog v-model:show="dialogVisible">
      <my-input
        class="inp"
        :value="name"
        @input="name = $event.target.value"
        type="text"
        placeholder="Введите тему"
      ></my-input>
      <my-input
        class="inp"
        :value="body"
        @input="body = $event.target.value"
        type="text"
        placeholder="Введите текст"
      ></my-input>
      <my-input
        class="inp"
        :value="email"
        @input="email = $event.target.value"
        type="text"
        placeholder="Введите почту"
      ></my-input>
      <my-button class="btn1" @click="createComment">Отправить</my-button>
      </my-dialog>
    </form>
    <div class="post" v-for="comment in comments" :key="comment">
      <div><strong>Название:</strong>{{ comment.name }}</div>
      <div><strong>Email:</strong>{{ comment.email }}</div>
      <div><strong>Описание:</strong>{{ comment.body }}</div>
      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
export default {
  components: { MyInput, MyButton },

  data() {
    return {
      comments: [],
      dialogVisible: false,
      name: "",
      email: "",
      body: "",
      selectedUserId: "nobody",
    };
  },
  methods: {
    showDialog(){
    this.dialogVisible = true;
    },
    async createComment() {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/comments",
          {
            name: this.name,
            email: this.email,
            body: this.body,
            postId: this.$route.params.id,
          }
        );
        console.log(response);
      } catch (e) {

        console.log(e);
      }
      this.name = "";
      this.email = "";
      this.body = "";
      this.dialogVisible = false;
    },
    async fetchComments(postId) {
      const url = postId
        ? "https://jsonplaceholder.typicode.com/comments" + `?postId=${postId}`
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
  },
  async mounted() {
    await this.fetchComments();
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
};
</script>

<style lang="scss">
.inp {
  margin: 10px 0px;
}
.btn {
  margin-bottom: 10px;
}

  

</style>
