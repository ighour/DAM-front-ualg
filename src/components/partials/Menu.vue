<template>
    <b-nav fill tabs class='menu'>
        <b-nav-item :to="{name: 'index'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'movie'}" :disabled='!token'>My Movies</b-nav-item>
        <b-nav-item :to="{name: 'genre'}" :disabled='!token'>My Genres</b-nav-item>
        <b-nav-item :to="{name: 'user.spy'}">Spy Users</b-nav-item>
        <b-nav-item :to="{name: 'index'}" v-if='!token' exact>Login</b-nav-item>
        <b-nav-item disabled v-else>{{user.name}} <span @click='logout()' class='logout'>(logout)</span></b-nav-item>
    </b-nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            token: 'getToken',
            user: 'getUser'
        })
    },

    methods: {
        ...mapActions({
            clearAuth: 'clearAuth'
        }),

        logout(){
            this.clearAuth()
            this.$router.push({name: 'index'})
        }
    }
}
</script>

<style scoped>
    .menu {
        margin-bottom: 20px;
    }
    .logout {
        cursor: pointer;
        color: blue;
    }
</style>
