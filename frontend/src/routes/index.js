import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Find from './Find'
import NewlyItems from './NewlyItems'
import Board from './Board'
import BoardItems from './BoardItems'
import Sign from './Sign'

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
    {
      path: '/board',
      component: Board
    },
    {
      path: '/board/:items',
      component: BoardItems
    },
    {
      path: '/sign',
      component: Sign
    },
  ]
})