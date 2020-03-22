import request from '@/utils/request'

const actions = {
  list({ commit }, param) {
    return request({
      url: 'demo/list',
      method: 'post',
      data: param
    })
  },
  add({ commit }, param) {
    return request({
      url: 'demo/insert',
      method: 'post',
      data: param
    })
  },
  edit({ commit }, param) {
    return request({
      url: 'demo/update',
      method: 'post',
      data: param
    })
  },
  del({ commit }, id) {
    return request({
      url: 'demo/delete?id=' + id
    })
  }
}

export default {
  namespaced: true,
  actions
}

