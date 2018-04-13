import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Movie from '@/components/Movie'
import Genre from '@/components/Genre'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index, name: 'index' },

    { path: '/movies', component: Movie, name: 'movie' },

    { path: '/genres', component: Genre, name: 'genre' },

    { path: '*', redirect: {name: 'index'}}
  ]
})
