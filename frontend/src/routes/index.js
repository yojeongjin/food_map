import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Find from './Find'

export default createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/find',
      component: Find
    }
  ]
})