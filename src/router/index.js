import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Padrão em JOGO - Home'
    }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue'),
    meta: {
      title: 'Padrão em JOGO - Jogar'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'Padrão em JOGO - Sobre'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guarda de navegação para atualizar título da página
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// Guarda de navegação para limpar estado do jogo ao sair
router.beforeEach((to, from) => {
  if (from.name === 'Game' && to.name !== 'Game') {
    // Usando importação dinâmica para evitar dependência circular
    import('@/stores/gameStore').then(({ useGameStore }) => {
      const gameStore = useGameStore()
      gameStore.cleanup()
    })
  }
})

export default router