import { createRouter, createWebHistory } from 'vue-router'
import BrainStorming from '../views/BrainStorming.vue'

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: '/',
   name: 'BrainStorming',
   component: BrainStorming
  },
  {
   path: '/BrainStorming',
   name: 'BrainStorming',
   // route level code-splitting
   // this generates a separate chunk (About.[hash].js) for this route
   // which is lazy-loaded when the route is visited.
   component: BrainStorming
   // component: () => import('../views/StickyNotes.vue')
  }
 ]
})

export default router
