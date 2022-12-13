<template>
    <div>
        <h1 class="tit">
            <slot></slot>
        </h1>
    </div>
</template>

<script>
export default {
name: 'my-title'
}
</script>

<style>
.tit{
text-align: center;
}
</style>