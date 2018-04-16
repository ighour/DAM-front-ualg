<template>
    <b-nav fill tabs>
        <b-nav-item :to="{name: 'index'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'movie'}" :disabled='!false'>Movies</b-nav-item>
        <b-nav-item :to="{name: 'genre'}" :disabled='!false'>Genres</b-nav-item>
        <b-nav-item disabled v-if='!false'>Not Logged In</b-nav-item>
        <b-nav-item disabled v-else>NOME (logout)</b-nav-item>
    </b-nav>
</template>
