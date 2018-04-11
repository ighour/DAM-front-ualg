import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import User from '@/components/User'
import UserLogin from '@/components/user/Login'
import UserRegister from '@/components/user/Register'
import Movie from '@/components/Movie'
import MovieIndex from '@/components/movie/Index'
import MovieCreate from '@/components/movie/Create'
import MovieShow from '@/components/movie/Show'
import Genre from '@/components/Genre'
import GenreIndex from '@/components/genre/Index'
import GenreCreate from '@/components/genre/Create'
import GenreShow from '@/components/genre/Show'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index, name: 'index' },

    { path: '/users', component: User, redirect: {name: 'user.login'}, children: [
      { path: 'login', component: UserLogin, name: 'user.login' },
      { path: 'register', component: UserRegister, name: 'user.register' }
    ]},

    { path: '/movies', component: Movie, redirect: {name: 'movie.index'}, children: [
      { path: '', component: MovieIndex, name: 'movie.index' },
      { path: 'create', component: MovieCreate, name: 'movie.create' },
      { path: ':id', component: MovieShow, name: 'movie.show' }
    ]},

    { path: '/genres', component: Genre, redirect: {name: 'genre.index'}, children: [
      { path: '', component: GenreIndex, name: 'genre.index' },
      { path: 'create', component: GenreCreate, name: 'genre.create' },
      { path: ':id', component: GenreShow, name: 'genre.show' }
    ]},

    { path: '*', redirect: {name: 'index'}}
  ]
})
