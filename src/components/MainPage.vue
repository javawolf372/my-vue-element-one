<template>
  <div class="mainClass">
    <el-tabs v-model="tabsActiveName" type="card" @tab-click="tabClick" @edit="handleTabsEdit">
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
    },
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        const tabs = this.$store.state.common.tabsData
        let activeName = this.$store.state.common.tabsActiveName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.routerPath === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.routerPath
              }
            }
          })
        }
        const tempObj = { 'tabsActiveName': activeName, 'tabsData': tabs.filter(tab => tab.routerPath !== targetName) }
        this.$store.dispatch('common/setTabs', tempObj)
        this.$router.push(activeName)
      }
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
