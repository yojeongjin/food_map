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
        target: 'http://3.36.188.55/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../backend/public'
})
