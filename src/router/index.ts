import { createRouter, createWebHistory } from 'vue-router'
import BrainStorming from '../views/BrainStorming.vue'
import BuildQuery from '../views/BuildQuery.vue'

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: '/',
   name: 'WonderWall',
   component: BrainStorming
  },
  {
   path: '/BuildQuery',
   name: 'BuildQuery',
   component: BuildQuery
  }
 ]
})

export default router
