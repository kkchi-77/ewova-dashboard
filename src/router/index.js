import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../api'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Students from '../views/Students.vue'
import Courses from '../views/Courses.vue'
import AI from '../views/AI.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/students', name: 'Students', component: Students, meta: { requiresAuth: true } },
  { path: '/courses', name: 'Courses', component: Courses, meta: { requiresAuth: true } },
  { path: '/ai', name: 'AI', component: AI, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuth()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'Login' }
  }
})

export default router
