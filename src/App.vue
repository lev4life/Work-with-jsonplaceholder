<template>
    <navbar></navbar>
  <div class="app">
    <my-title></my-title>
    <router-view></router-view>
    <my-dialog></my-dialog>
  </div>
</template>

<script>
import Navbar from "@/UI/Navbar.vue"

export default {
components: {
  Navbar
}
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.app{
  padding: 20px;
}
</style>