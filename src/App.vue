<template>
  <div id="app">
    <div>
    </div>
    <router-link :to="'home'">Home</router-link>
    |
    <router-link :to="'main'">Main</router-link>
    |
    <router-link :to="'about'">About</router-link>
    |
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }
</script>

<style>

</style>
