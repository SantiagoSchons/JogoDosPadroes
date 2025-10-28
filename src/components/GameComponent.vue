<template>
  <div class="game">
    <div class="game-header">
      <div class="game-info">
        <div class="timer" :class="{ 'timer-warning': gameStore.timeLeft <= 10 }">
          ⏱️ {{ gameStore.formattedTime }}
        </div>
        <div class="score">
          ✅ {{ gameStore.score }} acertos
        </div>
      </div>
    </div>

    <div class="game-content" v-if="!gameStore.gameFinished">
      <div class="pattern-section">
        <h2 class="section-title">Complete a sequência:</h2>
        <div class="pattern-container">
          <div 
            v-for="(item, index) in gameStore.currentPattern" 
            :key="index"
            class="pattern-item"
            :class="{ 'pattern-item-missing': item === '?' }"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="options-section">
        <div class="options-grid">
          <button
            v-for="(option, index) in gameStore.options"
            :key="index"
            class="option-btn"
            :class="gameStore.getOptionClass(option)"
            @click="handleAnswer(option)"
            :disabled="gameStore.isOptionDisabled"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div 
        v-if="gameStore.feedback.message" 
        class="feedback"
        :class="gameStore.feedback.type"
      >
        {{ gameStore.feedback.message }}
      </div>
    </div>

    <div class="results-screen" v-else>
      <div class="results-card">
        <h2 class="results-title">SEU DESEMPENHO</h2>
        
        <div class="performance-badge" :class="gameStore.performanceClass">
          {{ gameStore.performanceText }}
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ gameStore.score }}</div>
            <div class="stat-label">Acertos</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ gameStore.errors }}</div>
            <div class="stat-label">Erros</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ gameStore.averageTime }}s</div>
            <div class="stat-label">Tempo Médio</div>
          </div>
        </div>

        <div class="results-actions">
          <button @click="gameStore.restartGame()" class="btn btn-primary">
            Jogar Novamente
          </button>
          <button @click="goToHome" class="btn btn-secondary">
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const gameStore = useGameStore()
const router = useRouter()

const handleAnswer = (option) => {
  gameStore.selectAnswer(option)
}

const goToHome = () => {
  gameStore.cleanup()
  router.push('/')
}

onMounted(() => {
  gameStore.initGame()
})

onUnmounted(() => {
  gameStore.cleanup()
})
</script>

<style scoped>
.game {
  min-height: calc(100vh - 80px);
  padding: 20px 0;
}

.game-header {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.timer, .score {
  padding: 10px 20px;
  border-radius: 25px;
  background: var(--primary-color);
  color: white;
}

.timer-warning {
  background: var(--danger-color) !important;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.game-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.pattern-section {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  color: var(--dark-color);
  margin-bottom: 30px;
}

.pattern-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.pattern-item {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-color);
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.pattern-item-missing {
  background: var(--warning-color);
  color: white;
  border: 2px dashed white;
}

.options-section {
  margin-bottom: 30px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.option-btn {
  padding: 20px;
  background: var(--light-color);
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.option-btn.correct {
  background: var(--success-color);
  color: white;
}

.option-btn.incorrect {
  background: var(--danger-color);
  color: white;
}

.option-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.feedback {
  padding: 20px;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 20px;
}

.feedback.correct {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.feedback.incorrect {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.results-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.results-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.results-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 30px;
}

.performance-badge {
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 30px;
  display: inline-block;
}

.performance-badge.excellent {
  background: #d4edda;
  color: #155724;
}

.performance-badge.good {
  background: #d1ecf1;
  color: #0c5460;
}

.performance-badge.average {
  background: #fff3cd;
  color: #856404;
}

.performance-badge.poor {
  background: #f8d7da;
  color: #721c24;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 40px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.results-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .game-content {
    padding: 20px;
  }
  
  .pattern-item {
    width: 60px;
    height: 60px;
    font-size: 1.2rem;
  }
  
  .options-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>