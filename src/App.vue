<template>
  <div id="app">
    <div class='container-fluid container-menu'>
      <app-menu></app-menu>
    </div>
    <div class='container'>
      <router-view></router-view>
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
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
  .container-menu {
    margin-bottom: 60px;
  }
</style>