import Vue from 'vue'
import VueRouter from 'vue-router'
import GameDetail from "../views/GameDetail.vue";
import ShoppingCart from "@/views/ShoppingCart";
import TEST from "@/views/TEST";
Vue.use(VueRouter)

const routes = [
  {
    path: '/detail:game_id',
    name: 'GameDetail',
    component: GameDetail,
    props: true,
  },
  {
    path: '/cart/id=?:user_id',
    name: 'ShoppingCart',
    component: ShoppingCart,
    props: true,
  },
  {
    path: '/',
    name: 'TEST',
    component: TEST,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
