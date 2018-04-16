<template>
  <div id="app">
    <div class='container-fluid'>
      <app-menu :auth='auth'></app-menu>
    </div>
    <div class='container content'>
      <router-view :auth='auth' v-on:userAuth='userAuth'></router-view>
    </div>
    <div class='container-fluid'>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/partials/Menu'
import Footer from '@/components/partials/Footer'

export default {
  name: 'App',

  components: {
        'app-menu': Menu,
        'app-footer': Footer
  },

  data(){
    return {
      auth: {
        email: null,
        name: null,
        token: null
      }
    }
  },

  methods: {
    userAuth(params){
      this.auth.token = params.token
      this.auth.name = params.name
      this.auth.email = params.email
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  margin-bottom: 60px;
}
</style>
