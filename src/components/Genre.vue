<template>
  <div>
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Genre',
  data () {
    return {
      msg: 'Genre Management'
    }
  }
}
</script>