<template>
  <div>
    <select class="select" @input="setSelected" :value="selectedUserId">
      <option :value="user.id" v-for="user in users" :key="user.id">
        {{ user.name }}
      </option>
      <option value="nobody">Господин никто</option>
    </select>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState({
    selectedUserId: (state) => state.selectedUserId,
    users: (state) => state.users,
  }),
  methods: {
    ...mapMutations(["setSelectedUser"]),
    setSelected(event) {
      this.setSelectedUser(event.target.value);
    },
  }
};
</script>

<style scoped>
.select {
  width: 200px;
  text-align: center;
  border: 2px solid #fd974f;
  border-radius: 5px;
  box-shadow: 2px 2px 2px grey;
  color: #fd974f;
  margin-bottom: 10px;
}
</style>
