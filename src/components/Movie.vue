<template>
  <div>
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  data () {
    return {
      msg: 'Movie Management'
    }
  }
}
</script>