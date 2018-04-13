<template>
    <b-nav fill tabs>
        <b-nav-item :to="{name: 'index'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'movie'}">Movies</b-nav-item>
        <b-nav-item :to="{name: 'genre'}">Genres</b-nav-item>
        <b-nav-item disabled>Not Logged In</b-nav-item>
    </b-nav>
</template>