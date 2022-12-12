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
        target: 'https://www.searcheat.shop/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../backend/public'
})