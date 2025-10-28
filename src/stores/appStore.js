import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const currentPage = ref('home')
  const userPreferences = ref({
    soundEnabled: true,
    animationsEnabled: true,
    difficulty: 'medium'
  })

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  const updatePreferences = (preferences) => {
    userPreferences.value = { ...userPreferences.value, ...preferences }
  }

  return {
    isLoading,
    currentPage,
    userPreferences,
    setLoading,
    setCurrentPage,
    updatePreferences
  }
})