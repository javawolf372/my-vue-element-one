import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'
import router from '@/router'

const state = {
  token: getToken,
  cachedViews: [],
  tabsData: [{
    id: 10000,
    title: '首页',
    routerPath: '/main'
  }],
  tabsActiveName: '/main',
  menuData: [],
  buttonIds: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  ADD_TABS: (state, obj) => {
    state.tabsData.push(obj)
  },
  INIT_TABS: (state) => {
    state.tabsData = [{
      id: 10000,
      title: '首页',
      routerPath: '/main'
    }]
  },
  SET_TABS_ACTIVE_NAME: (state, val) => {
    state.tabsActiveName = val
  },
  SET_TABS_DATA: (state, val) => {
    state.tabsData = val
  },
  SET_MENU_DATA: (state, data) => {
    state.menuData = data
  },
  SET_BUTTONS_DATA: (state, data) => {
    state.buttonIds = data
  }
}

const actions = {
  login({ commit }, userInfo) {
    return request({
      url: 'common/login',
      method: 'post',
      data: userInfo
    }).then(response => {
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      // 封装一下菜单数据
      const menuItems = []
      for (const d of data.menuData.childAuth) {
        const childs = []
        for (const c of d.lowerMenu) {
          const child = {
            id: c.id,
            title: c.title,
            url: c.url
          }
          childs.push(child)
        }
        const menuItem = {
          id: d.id,
          title: d.parentTitle,
          iconClass: d.icon,
          childs: childs
        }
        menuItems.push(menuItem)
      }
      commit('SET_MENU_DATA', menuItems)
      // 设置页面按钮权限
      commit('SET_BUTTONS_DATA', data.menuData.buttons)
    }).catch(error => {
      console.log('登录失败---' + error)
      throw error
    })
  },
  logout({ commit }) {
    commit('SET_TOKEN', '')
    removeToken()
    router.push({ path: '/' })
  },
  test({ commit }) {
    return request({
      url: 'common/test'
    })
  },
  addTabs({ commit, state }, data) {
    const quest = state.tabsData.find((item) => item.id === data.id)
    if (!quest) {
      commit('ADD_TABS', {
        id: data.id,
        title: data.title,
        isClosable: true,
        routerPath: data.url
      })
    }
    commit('SET_TABS_ACTIVE_NAME', data.url)
  },
  initStore({ commit }) {
    commit('INIT_TABS')
    commit('SET_TABS_ACTIVE_NAME', '/main')
  },
  setTabs({ commit }, data) {
    commit('SET_TABS_ACTIVE_NAME', data.tabsActiveName)
    commit('SET_TABS_DATA', data.tabsData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

