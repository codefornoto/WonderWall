import { createRouter, createWebHistory } from 'vue-router'
import BrainStorming from '../views/BrainStorming.vue'

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: '/',
   name: 'WonderWall',
   component: BrainStorming
  }
 ]
})

export default router
