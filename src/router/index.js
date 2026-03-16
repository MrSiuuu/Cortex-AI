import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Accueil' }
  },
  {
    path: '/connexion',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Connexion' }
  },
  {
    path: '/inscription',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Créer un compte' }
  },
  {
    path: '/formation',
    name: 'formation',
    component: () => import('../views/FormationView.vue'),
    meta: { title: 'Formation IA' }
  },
  {
    path: '/tableau-de-bord',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: 'Tableau de bord', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuth()
    await auth.getReady()
    if (!auth.user.value) return { name: 'login', query: { redirect: to.fullPath } }
  }
  return true
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — Kortex AI` : 'Kortex AI'
})

export default router
