const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData : `@import "@/assets/scss/reset.scss";`
      }
    }
  },
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://15.164.56.29:3000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../backend/public'
})