import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
import {store} from './store/store'
import moment from 'moment'
import dotenv from 'dotenv'


dotenv.config()

Vue.use(VueRouter)

Vue.filter('date',function(val){
  let date = new Date(parseInt(val))
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
})

const router = new VueRouter({
  routes,
  mode:"history",
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
