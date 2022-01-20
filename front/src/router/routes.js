
const routes = [
  { path: '/login', name: 'login', component: () => import('pages/login.vue') },
  { path: '/register', name: 'register', component: () => import('pages/register.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'error',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
