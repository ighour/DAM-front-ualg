import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '@/axios/config'

Vue.use(Vuex);

let token = localStorage.getItem('token')
let user = JSON.parse(localStorage.getItem('user'))

export const store = new Vuex.Store({
    state: {
        auth: {
            token: token,
            user: {
                id: user != null ? user.id : null,
                name: user != null ? user.name : null,
                email: user != null ? user.email : null,
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
            localStorage.setItem('token', payload)
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + payload        
            commit('setToken', payload)
        },
        setUser({commit}, payload){
            localStorage.setItem('user', JSON.stringify(payload))
            commit('setUser', payload)
        },
        clearAuth({commit}){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            axiosInstance.defaults.headers['Authorization'] = null
            commit('setToken', null)
            commit('setUser', {
                id: null,
                name: null,
                email: null
            })
        }
    }
})