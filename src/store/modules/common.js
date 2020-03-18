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
  tabsActiveName: '/main'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  ADD_TABS: (state, obj) => {
    state.tabsData.push(obj)
  },
  SET_TABS_ACTIVE_NAME: (state, val) => {
    state.tabsActiveName = val
  }
}

const actions = {
  login({ commit }, userInfo) {
    return request({
      url: 'common/login',
      method: 'post',
      data: userInfo
    }).then(response => {
      console.log('response：' + response)
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
    }).catch(error => {
      console.log('---' + error)
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
  addTabs({ commit }, data) {
    const quest = state.tabsData.find((item) => item.routerPath === data.url)
    if (!quest) {
      commit('ADD_TABS', {
        id: data.id,
        title: data.title,
        isClosable: true,
        routerPath: data.url
      })
    }
    commit('SET_TABS_ACTIVE_NAME', data.url)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

