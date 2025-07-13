import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../views/compras.vue'

const index = [
  { path: '/', component: Principal },
]

const router = createRouter({
    history: createWebHistory(),
    routes: index
})

export default router