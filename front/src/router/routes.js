
const routes = [
  { path: '/login', name: 'login', component: () => import('pages/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: '/users', name: 'users', component: () => import('pages/users.vue') }
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
