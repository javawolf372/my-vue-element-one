<template>
  <el-container class="containerClass">
    <el-header class="headerClass">
      <my-header></my-header>
    </el-header>
    <el-container>
      <el-aside width="200px" class="asideClass">
        <my-menu class="asideClassMyMenu"></my-menu>
      </el-aside>
      <el-main class="mainClass">
        <my-main-page></my-main-page>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MyHeader from '@/components/Header'
import MyMenu from '@/components/Menu'
import MyMainPage from '@/components/MainPage'

export default {
  name: 'Main',
  components: { MyHeader, MyMenu, MyMainPage },
  created() {
    this.$store.dispatch('common/initStore')
    this.$router.push({ path: '/main' })
  }
}
</script>

<style scoped>
  .containerClass {
    height: 100%;
  }

  .headerClass {
    width: 100%;
    background-color: #545c64;
    float: right;
    height: 100%;
  }

  .asideClass {
    height: calc(100vh - 65);
  }

  .asideClassMyMenu{
    height: 100%;
  }

  .mainClass {
    height: 100%;
  }
</style>
