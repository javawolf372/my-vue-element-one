import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import ZHLang from './lang/zh'
import EnLang from './lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(Element)

Vue.directive('has', {
  inserted: function(el, binding, vnode) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el)
    }

    function permissionJudge(value) {
      const list = vnode.context.$store.state.common.buttonIds
      for (const item of list) {
        if (item === value) {
          return true
        }
      }
      return false
    }
  }
})

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识 可通过this.$i18n.locale 切换locale的值来实现语言切换
  messages: {
    // 中文语言包
    'zh-CN': ZHLang,
    // 英文语言包
    'en-US': EnLang
  }
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
