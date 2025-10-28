<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo" @click.prevent="goToHome">
          Padrão em JOGO
        </a>
        <nav class="nav">
          <a 
            href="/" 
            class="nav-link"
            :class="{ active: $route.name === 'Home' }"
            @click.prevent="goToHome"
          >
            Home
          </a>
          <a 
            href="/game" 
            class="nav-link"
            :class="{ active: $route.name === 'Game' }"
            @click.prevent="goToGame"
          >
            Jogar
          </a>
          <a 
            href="/about" 
            class="nav-link"
            :class="{ active: $route.name === 'About' }"
            @click.prevent="goToAbout"
          >
            Sobre
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router'

const gameStore = useGameStore()
const appStore = useAppStore()
const router = useRouter()

const goToHome = () => {
  if (router.currentRoute.value.name === 'Game') {
    gameStore.cleanup()
  }
  router.push('/')
}

const goToGame = () => {
  router.push('/game')
}

const goToAbout = () => {
  if (router.currentRoute.value.name === 'Game') {
    gameStore.cleanup()
  }
  router.push('/about')
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: var(--primary-color);
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--secondary-color);
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: var(--dark-color);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
  background: var(--primary-color);
  color: white;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav {
    gap: 10px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>