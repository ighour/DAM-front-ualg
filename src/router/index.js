import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import User from '@/components/User'
import UserLogin from '@/components/user/Login'
import UserRegister from '@/components/user/Register'
import Movie from '@/components/Movie'
import Genre from '@/components/Genre'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index, name: 'index' },

    { path: '/users', component: User, redirect: {name: 'user.login'}, children: [
      { path: 'login', component: UserLogin, name: 'user.login' },
      { path: 'register', component: UserRegister, name: 'user.register' }
    ]},

    { path: '/movies', component: Movie, name: 'movie' },

    { path: '/genres', component: Genre, name: 'genre' },

    { path: '*', redirect: {name: 'index'}}
  ]
})
