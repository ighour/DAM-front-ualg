<template>
    <b-nav fill tabs>
        <b-nav-item :to="{name: 'index'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'movie'}" :disabled='!token'>Movies</b-nav-item>
        <b-nav-item :to="{name: 'genre'}" :disabled='!token'>Genres</b-nav-item>
        <b-nav-item disabled v-if='!token'>Not Logged In</b-nav-item>
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
            setToken: 'setToken',
            setUser: 'setUser'
        }),

        logout(){
            this.setToken(null)
            this.setUser(null)
            this.$router.push({name: 'index'})
        }
    }
}
</script>

<style scoped>
    .logout {
        cursor: pointer;
        color: blue;
    }
</style>
