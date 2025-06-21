import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginVue.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  } else {
    document.title = 'My App'
  }
  next()
})

export default router