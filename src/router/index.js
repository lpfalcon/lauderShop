import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/views/CatalogView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ErrorLayout from '../layouts/ErrorLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Catalog',
          component: CatalogView,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/AboutView.vue')
        },
      ]

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: ErrorLayout,
      props: { error: { statusCode: 404, message: 'Page Not Found' } }

    }
  ],
})

export default router
