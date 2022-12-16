<template>
  <div class="navbar">
    <div class="title" @click="$router.push('/')"><strong>Quest 3</strong></div>
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
  cursor: pointer;
}

.navbar {
  display: flex;
  height: 50px;
  background-color: #DDC5A2;
  box-shadow: 0 0 500px #DDC5A2;
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
    box-shadow: 0 0 5px#fb8a3a;

    &:active {
      background: #9b4b12;
    }
  }
}
</style>
