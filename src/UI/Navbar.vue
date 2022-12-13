<template>
  <div class="navbar">
    <div class="title"><strong>Quest 3</strong></div>
    <div class="navbar__btns">
      <button class="button" @click="$router.push('/')">На главную</button>
      <button class="button" @click="$router.push('/posts')">Посты</button>
      <button class="button" @click="$router.push('/albums')">Альбом</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.title {
  margin-top: 16px;
  margin-left: 10px;
}

.navbar {
  height: 50px;
  background-color: #805a3b;
  display: flex;
}

.button {
  background: #fd974f;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  justify-content: space-between;
  margin-top: 13px;
  margin-left: 10px;
  transition: 0.3s;

  &:hover {
    background: #fb8a3a;

    &:active {
      background: #9b4b12;
    }
  }
}
</style>
