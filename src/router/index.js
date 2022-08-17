import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRegister from '../views/LoginRegister.vue'
import GameDetail from "../views/GameDetail.vue";
import TEST from "@/views/TEST";
import GameCarousel from "@/components/GameCarousel";
import HomePage from "@/views/HomePage";
Vue.use(VueRouter)

const routes = [
  {
    path:'/.',
    name:'login',
    component: loginRegister
  },
  {
    path: '/',
    name: 'GameDetail',
    component: GameDetail
  },
  {
    path: '/.',
    name: 'Carouesel',
    component: GameCarousel,
  },
  {
    path: '/.',
    name: 'TEST',
    component: TEST
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
