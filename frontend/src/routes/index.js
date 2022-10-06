import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Find from './Find'
import NewlyItems from './NewlyItems'
import Board from './Board'
import BoardItems from './BoardItems'
import SignIn from './SignIn'
import Join from './Join'

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
      path: '/signin',
      component: SignIn
    },
    {
      path: '/join',
      component: Join
    },
  ]
})