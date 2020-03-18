<template>
  <div>
    <el-menu
      router
      background-color="#545c64"
      style="height: 100%"
      text-color="#fff"
      :collapse="isShowMenu"
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
    this.menuItems = [{
      id: 1001,
      title: '样例',
      iconClass: 'el-icon-location',
      childs: [{
        id: 100101,
        title: '综合数据表格',
        url: 'demo'
      }, {
        id: 100102,
        title: '测试2',
        url: 'demo2'
      }]
    }]
  },
  methods: {
    selectMenuItem(data) {
      this.$store.dispatch('common/addTabs', data)
    }
  }
}
</script>

<style scoped>
</style>
