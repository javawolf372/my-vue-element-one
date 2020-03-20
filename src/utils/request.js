import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: '/springbootApi', // axios 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res === 413) {
        MessageBox.confirm('token失效或者已登出，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          center: true,
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('common/logout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.message?res.message:'系统错误，请联系管理员！',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject()
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '系统内部错误：' + error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
