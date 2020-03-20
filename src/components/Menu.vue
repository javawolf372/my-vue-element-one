<template>
  <div>
    <el-menu
      router
      background-color="#545c64"
      style="height: 100%"
      text-color="#fff"
      :collapse="isShowMenu"
      :unique-opened="true"
    >
      <el-submenu v-for="sm in menuItems" :key="sm.id" :index="'sub'+sm.id">
        <template slot="title">
          <i :class="sm.iconClass" />
          <span>{{ sm.title }}</span>
        </template>
        <el-menu-item
          v-for="item in sm.childs"
          :key="item.id"
          :index="item.url"
          @click="selectMenuItem(item)"
        >
          {{ item.title }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuItems: [],
      isShowMenu: false
    }
  },
  created() {
    this.showMenu()
  },
  methods: {
    selectMenuItem(data) {
      if (this.$router.options.routes[2].children.find((item) => item.path.includes(data.url))) {
        this.$store.dispatch('common/addTabs', data)
      } else {
        console.log('五权限')
      }
    },
    showMenu() {
      this.menuItems = this.$store.state.common.menuData
    }
  }
}
</script>

<style scoped>
</style>
