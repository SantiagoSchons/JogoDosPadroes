<script setup>
import Header from './components/Header.vue'
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px 0;
  min-height: calc(100vh - 80px);
}

/* Transições entre rotas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

