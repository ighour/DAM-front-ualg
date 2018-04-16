import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        auth: {
            token: null,
            user: {
                id: null,
                name: null,
                email: null
            }
        }
    },
    getters: {
        getToken: state => {
            return state.auth.token
        },
        getUser: state => {
            return state.auth.user
        }
    },
    mutations: {
        setToken(state, payload){
            state.auth.token = payload
        },
        setUser(state, payload){
            state.auth.user = {...payload}
        }
    },
    actions: {
        setToken({commit}, payload){
            commit('setToken', payload)
        },
        setUser({commit}, payload){
            commit('setUser', payload)
        }
    }
})