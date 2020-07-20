<template>

<div class="user-edit">
<img :src="avatar" alt="头像">

<div><span>{{ username }}</span></div>

</div>

</template>

<style>
.user-edit{
  text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    username: function () {
      return this.$store.getters.getUserInfo.username
    },
    avatar: function () {
      return this.$store.getters.getUserInfo.avatar
    }
  },
}
</script>
