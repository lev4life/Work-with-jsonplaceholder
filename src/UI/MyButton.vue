<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
name: 'my-button'
}
</script>

<style>
.btn{
background: #FD974F;
border: none;
border-radius: 5px;
padding: 5px;
cursor: pointer;
box-shadow: 2px 2px 2px grey;

transition: 0.3s;
}
.btn:hover{
background:#fb8a3a
}
.btn:active{
background: #9b4b12;

}
</style>