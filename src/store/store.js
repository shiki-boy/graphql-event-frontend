import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/Api'
// import {
//   rejects
// } from 'assert';
// import { resolve } from 'dns';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      isAuth: false,
      token: null,
      userId: null
      // username:null
    },
    isLoading: true,
    message: {
      isError: false,
      text: null
    }
  },
  getters: {
    isAuth: state => state.user.isAuth,
    getToken: state => state.user.token,
    currentUser: state => state.user.userId,
    isLoading: state => state.isLoading,
    msg: state => state.message,
  },
  mutations: {
    setUser: (state, payload) => {
      state.user.isAuth = true
      state.user.token = payload.token
      state.user.userId = payload.userId
      localStorage.setItem('token', payload.token)
      localStorage.setItem('tokenExpiration', `${new Date()}`)
      // state.username = payload.username
      // localStorage.setItem('username',payload.username)
    },
    logoutUser: (state) => {
      state.user.isAuth = false
      state.user.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    },
    loadingComplete: (state) => {
      state.isLoading = false
    },
    setMsg: (state, payload) => {
      console.log('running');
      state.message.text = payload.text
      state.message.isError = payload.isError
    },
    resetMsg: (state) => {
      state.message.text = null
    }
  },
  actions: {
    setUser: (context, payload) => {
      context.commit('setUser', payload)
    },
    logoutUser: (context) => {
      context.commit('logoutUser')
    },
    tryAutoLogin: (context) => {
      // console.log('auto login')
      return new Promise((resolve, reject) => {

        let token = localStorage.getItem('token')
        if (!token) {
          context.commit('logoutUser')
          reject('0')
        }
        let tokenExpiration = localStorage.getItem('tokenExpiration')
        let now = new Date()
        if (now - tokenExpiration >= 3600000) {
          context.commit('logoutUser')
          context.commit('setMsg', {
            text: 'Session Expired',
            isError: true
          })
          setTimeout(() => context.commit('resetMsg'), 5000)
          reject('0')
        }

        let requestBody = {
          query: `
          query{
            authToken(token:"${token}"){
              userId
              token
              tokenExpiration
            }
          }
        `
        }

        let headers = {
          'Authorization': `Bearer ${token}`
        }

        Api().post('/graphql', {
            query: requestBody.query
          }, {
            headers
          })
          .then(res => {
            context.commit('setUser', {
              token: res.data.data.authToken.token,
              userId: res.data.data.authToken.userId
            })
            resolve('200')
            context.commit('setMsg', {
              text: 'Logged in',
              isError: false
            })
            setTimeout(() => context.commit('resetMsg'), 5000)
          })
          .catch(e => console.log(e))
      })

    },
    loadingComplete: (context) => {
      context.commit('loadingComplete')
    },
    setMsg: (context, payload) => {
      context.commit('setMsg', payload)
    },
    resetMsg: (context) => context.commit('resetMsg')
  }
})
