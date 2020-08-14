<template>
  <div class="main">
    <div class="ver-part">
      <TopBar></TopBar>
      <LeftMenu></LeftMenu>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar.vue'
import LeftMenu from '@/components/LeftMenu.vue'

export default {
  name: 'Main',
  components: {
    TopBar,
    LeftMenu
  }
}

</script>

<style scoped>
  .ver-part {
    display: flex;
    flex-direction: column; /* flex布局 内部对其方式*/
    height: 100%;
  }

  .main{
    height: 100%;
  }
</style>
