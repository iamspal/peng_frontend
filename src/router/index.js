import { createRouter, createWebHistory } from 'vue-router'
import ImageClickerView from '../views/ImageClickerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'image-clicker',
      component: ImageClickerView
    }
  ]
})

export default router
