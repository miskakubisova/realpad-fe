const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/forecast': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true
      },
      '/cities': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true
      }
    }
  }
})
