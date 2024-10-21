import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '../views/NotesView.vue'
import SettingView from '../views/SettingView.vue'

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: '/',
   name: 'WonderWall',
   component: NotesView
  },
  {
   path: '/SettingView',
   name: 'SettingView',
   component: SettingView
  }
 ]
})

export default router
