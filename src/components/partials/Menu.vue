<template>
    <b-nav fill tabs>
        <b-nav-item :to="{name: 'index'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'movie'}" :disabled='!auth.token'>Movies</b-nav-item>
        <b-nav-item :to="{name: 'genre'}" :disabled='!auth.token'>Genres</b-nav-item>
        <b-nav-item disabled v-if='!auth.token'>Not Logged In</b-nav-item>
        <b-nav-item disabled v-else>{{auth.name}}</b-nav-item>
    </b-nav>
</template>

<script>
export default {
  props: ['auth']
}
</script>
