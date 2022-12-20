<template>
  <div>
    <my-title>Альбом</my-title>
    <form @submit.prevent>
      <div>
        <h4>Выбрать пользователя:</h4>
        <UserSelect />
      </div>
    </form>
    <div v-if="albums.length > 0">
      <div
        class="albums"
        v-for="album in albums"
        :key="album"
        @click="$router.push(`/albums/${album.id}`)"
      >
        <div><strong>Пользователь: </strong>{{ getUserNameById(album.userId) }}</div>
        <div><strong>Номер: </strong>{{ album.id }}</div>
        <div><strong>Название: </strong>{{ album.title }}</div>
        <hr class="hr" />
      </div>
    </div>
    <h4 class="message" v-else>Список постов пуст. Выберите пользователя.</h4>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import MyTitle from "@/UI/MyTitle.vue";
import UserSelect from "@/UI/UserSelect.vue";
export default {
  components: { MyTitle, UserSelect },
  computed: {
    ...mapState({
      selectedUserId: (state) => state.selectedUserId,
    }),
    ...mapGetters(["getUserNameById"]),
  },

  data() {
    return {
      albums: [],
    };
  },
  methods: {
    setSelected(event) {
      this.setSelectedUser(event.target.value);
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
        await this.fetchAlbums();
      } else {
        await this.fetchAlbums(newVal);
      }
    },
  },
},
};
</script>

<style lang="scss" scoped>
.hr {
  margin: 20px 0;
  box-shadow: 1px 1px 2px grey;
}

.message {
  margin-top: 20px;
  text-align: center;
  color: #fd974f;
}

.albums {
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
