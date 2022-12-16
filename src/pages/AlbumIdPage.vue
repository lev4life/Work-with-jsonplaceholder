<template>
  <div>
    <my-title>Альбом № {{ $route.params.id }}</my-title>
    <div class="post" v-for="photo in photos" :key="photo.id">
      <div><strong>Название:</strong>{{ photo.title }}</div>
      <div><strong>Адрес:</strong>{{ photo.url }}</div>
      <div><strong>Миниатюра:</strong></div>
      <img class="post__img" :src="photo.thumbnailUrl" >
      <hr class="post__img-line"/>
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
      photos: [],
    };
  },
  methods: {

    async fetchPhotos(albumId) {
      const url = albumId
        ? "https://jsonplaceholder.typicode.com/photos" + `?albumId=${albumId}`
        : "https://jsonplaceholder.typicode.com/photos";

      try {
        const response = await axios.get(url);
        setTimeout(() => {
          this.photos = response.data;
          console.log(response);
        }, 2000);
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  async mounted() {
    await this.fetchPhotos();
  },
};
</script >

<style lang="scss" scoped>
.inp {
  margin: 10px 0px;
}
.btn {
  margin-bottom: 10px;
}
.post{
  width: 30%;
  display:inline-block;
  margin: 110px;
  &__img{
    margin-top:10px;
    margin-bottom: 10px;
    margin-left: 28%;
  }
  &__img-line{
    box-shadow: 1px 1px 2px grey;
  }
}
</style>
