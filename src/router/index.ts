import BlankLayout from '@/layouts/blank.vue'
import DefaultLayout from '@/layouts/default.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddView from '../views/AddView.vue'
import HomeView from '../views/HomeView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'default',
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'add',
          name: 'add',
          component: AddView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: BlankLayout,
      children: [
        {
          path: '',
          name: 'not-found',
          component: PageNotFoundView
        }
      ]
    }
  ]
})

export default router
