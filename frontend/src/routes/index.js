import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Find from './Find'
import NewlyItems from './NewlyItems'

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
    },
    {
      path: '/newly/:idx',
      component: NewlyItems
    },
  ]
})