<template>
  <div>
    <my-title>Пост № {{ $route.params.id }}</my-title>
    <form @submit.prevent>
      <h4>Комментарии:</h4>
      <my-input :value="user" @input="user = $event.target.value" type="text" placeholder="Введите имя пользователя"
        >Пользователь</my-input
      >
      <my-input :value="title" @input="body = $event.target.value" type="text" placeholder="Введите комментарий"
        >Название</my-input
      >
      <my-button @click="createComment">Отправить</my-button>
    </form>
    <div v-for="comment in comments"
        :key="comment">
      <div><strong>Пользователь:</strong>{{ comment.user }}</div>
        <div><strong>Описание:</strong>{{ comment.body }}</div>
        <hr />
    </div>
  </div>
</template>

<script>
import MyInput from "@/UI/MyInput.vue";
import MyButton from "@/UI/MyButton.vue";
export default {
  components: { MyInput, MyButton },

  data() {
    return {
      comments: [],
      user: "",
      body: "",
    };
  },
  methods: {
    createComment() {
     
      const newComment = {
        id: Date.now(),
        user: this.user,
        body: this.body
      }
      
      setTimeout(() => {
        this.comments.push(newComment);
      },2000)
    },
  }
}
</script>

<style></style>
