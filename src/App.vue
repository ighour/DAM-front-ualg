<template>
  <div id="app">
    <app-menu></app-menu>
    <router-view></router-view>
    <app-footer></app-footer>
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