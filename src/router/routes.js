const routes = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')}
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Login.vue')},
      {path: ':name/:password', component: () => import('pages/Login.vue')}
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {path: '', component: () => import('pages/AdminPanel.vue')}
    ]
  },
  {
    path: '/image',
    component: () => import('layouts/ImageLayout.vue'),
    children: [
      {path: '', component: () => import('pages/AdminPanel.vue')}
    ]
  },
  {
    path: '/qr-generator',
    component: () => import('layouts/QrGenerateLayout.vue'),
    children: [
      {path: '', component: () => import('pages/QrGenerate.vue')}
    ]
  },
  {
    path: '/qr-login',
    component: () => import('layouts/QrLoginLayout.vue'),
    children: [
      {path: ':adminSessionId/:name/:surname/:patronymic', component: () => import('pages/QrLogin.vue')}
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
