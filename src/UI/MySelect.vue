<template>
  <div>
    <select class="select">
      <slot></slot>
    </select>
  </div>
</template>
<script>
export default {
  name: "my-select",
};
</script>

<style>
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
