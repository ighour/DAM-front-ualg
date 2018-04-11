<template>
  <div>
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'User Management'
    }
  }
}
</script>