'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = pkg.name || '我的第一个项目' // page title
const port = 9527 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/springbootApi': {
        // 测试环境
        target: 'http://localhost:8080', // 接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/springbootApi': '/' // 需要rewrite重写的
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
