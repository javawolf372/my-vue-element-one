<template>
  <div class="mainClass">
    <el-tabs v-model="tabsActiveName" type="card" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabsData"
        :key="item.id"
        :name="item.routerPath"
        :label="item.title"
        :closable="item.isClosable"
      />
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  methods: {
    tabClick: function(item) {
      this.$router.push(item.name)
    }
  },
  computed: {
    tabsData: {
      get() {
        return this.$store.state.common.tabsData
      },
      set(val) { // 如果不加set无法做到双向绑定，默认是无set方法的
        this.$store.state.common.tabsData = val
      }
    },
    tabsActiveName: {
      get() {
        return this.$store.state.common.tabsActiveName
      },
      set(val) { // 如果不加set无法做到双向绑定，默认是无set方法的
        this.$store.state.common.tabsActiveName = val
      }
    }
  }
}
</script>

<style scoped>
</style>
