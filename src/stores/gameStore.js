import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // Estado
  const currentPattern = ref([])
  const options = ref([])
  const correctAnswer = ref('')
  const score = ref(0)
  const errors = ref(0)
  const timeLeft = ref(30) // Alterado para 30 segundos
  const gameFinished = ref(false)
  const feedback = ref({ message: '', type: '' })
  const isOptionDisabled = ref(false)
  const responseTimes = ref([])
  const currentQuestionStartTime = ref(0)
  const timerInterval = ref(null)

  // Getters (computed)
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const averageTime = computed(() => {
    return responseTimes.value.length > 0 
      ? (responseTimes.value.reduce((a, b) => a + b, 0) / responseTimes.value.length).toFixed(1)
      : 0
  })

  const accuracy = computed(() => {
    const total = score.value + errors.value
    return total > 0 ? score.value / total : 0
  })

  const performanceText = computed(() => {
    if (accuracy.value >= 0.8) return 'Ótimo'
    if (accuracy.value >= 0.6) return 'Bom'
    if (accuracy.value >= 0.4) return 'Que tal praticar mais?'
    return 'Precisa melhorar'
  })

  const performanceClass = computed(() => {
    if (accuracy.value >= 0.8) return 'excellent'
    if (accuracy.value >= 0.6) return 'good'
    if (accuracy.value >= 0.4) return 'average'
    return 'poor'
  })

  // Ações
  const initGame = () => {
    score.value = 0
    errors.value = 0
    timeLeft.value = 30 // Alterado para 30 segundos
    gameFinished.value = false
    responseTimes.value = []
    feedback.value = { message: '', type: '' }
    isOptionDisabled.value = false
    
    startTimer()
    generateNewPattern()
  }

  const startTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
    
    timerInterval.value = setInterval(() => {
      timeLeft.value--
      
      if (timeLeft.value <= 0) {
        endGame()
      }
    }, 1000)
  }

  // ... (o restante do código permanece igual)

  const generateNewPattern = () => {
    currentQuestionStartTime.value = Date.now()
    feedback.value = { message: '', type: '' }
    isOptionDisabled.value = false
    
    const patternTypes = [
      generateNumberSequence,
      generateLetterSequence,
      generateShapePattern,
      generateColorSequence
    ]
    
    const selectedGenerator = patternTypes[Math.floor(Math.random() * patternTypes.length)]
    const { pattern, answer } = selectedGenerator()
    
    currentPattern.value = pattern
    correctAnswer.value = answer
    options.value = generateOptions(answer)
  }

  const generateNumberSequence = () => {
    const start = Math.floor(Math.random() * 10) + 1
    const step = Math.floor(Math.random() * 3) + 1
    const length = 4
    
    let sequence = []
    for (let i = 0; i < length; i++) {
      sequence.push(start + i * step)
    }
    
    const missingIndex = Math.floor(Math.random() * length)
    const answer = sequence[missingIndex]
    sequence[missingIndex] = '?'
    
    return { pattern: sequence, answer }
  }

  const generateLetterSequence = () => {
    const startChar = 'A'.charCodeAt(0) + Math.floor(Math.random() * 20)
    const length = 4
    
    let sequence = []
    for (let i = 0; i < length; i++) {
      sequence.push(String.fromCharCode(startChar + i))
    }
    
    const missingIndex = Math.floor(Math.random() * length)
    const answer = sequence[missingIndex]
    sequence[missingIndex] = '?'
    
    return { pattern: sequence, answer }
  }

  const generateShapePattern = () => {
    const shapes = ['▲', '●', '■', '★', '◆']
    const pattern = [0, 1, 2, 0, 1]
    const length = 5
    
    let sequence = []
    for (let i = 0; i < length; i++) {
      sequence.push(shapes[pattern[i]])
    }
    
    const missingIndex = Math.floor(Math.random() * length)
    const answer = sequence[missingIndex]
    sequence[missingIndex] = '?'
    
    return { pattern: sequence, answer }
  }

  const generateColorSequence = () => {
    const colors = ['🔴', '🟢', '🔵', '🟡', '🟣']
    const pattern = [0, 1, 2, 3, 0]
    const length = 5
    
    let sequence = []
    for (let i = 0; i < length; i++) {
      sequence.push(colors[pattern[i]])
    }
    
    const missingIndex = Math.floor(Math.random() * length)
    const answer = sequence[missingIndex]
    sequence[missingIndex] = '?'
    
    return { pattern: sequence, answer }
  }

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer]
    
    if (typeof correctAnswer === 'number') {
      while (options.length < 4) {
        const randomOption = correctAnswer + (Math.floor(Math.random() * 5) - 2)
        if (randomOption !== correctAnswer && !options.includes(randomOption) && randomOption > 0) {
          options.push(randomOption)
        }
      }
    } else {
      while (options.length < 4) {
        let randomOption
        if (correctAnswer.length === 1 && correctAnswer.match(/[A-Z]/)) {
          const charCode = correctAnswer.charCodeAt(0)
          randomOption = String.fromCharCode(charCode + (Math.floor(Math.random() * 5) - 2))
        } else {
          const allOptions = ['▲', '●', '■', '★', '◆', '🔴', '🟢', '🔵', '🟡', '🟣']
          randomOption = allOptions[Math.floor(Math.random() * allOptions.length)]
        }
        
        if (randomOption !== correctAnswer && !options.includes(randomOption)) {
          options.push(randomOption)
        }
      }
    }
    
    return shuffleArray(options)
  }

  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const selectAnswer = (selectedAnswer) => {
    isOptionDisabled.value = true
    const responseTime = (Date.now() - currentQuestionStartTime.value) / 1000
    responseTimes.value.push(responseTime)
    
    if (selectedAnswer === correctAnswer.value) {
      score.value++
      feedback.value = { 
        message: 'Resposta Correta!', 
        type: 'correct' 
      }
      playSound('correct')
    } else {
      errors.value++
      feedback.value = { 
        message: 'Resposta Incorreta!', 
        type: 'incorrect' 
      }
      playSound('incorrect')
    }
    
    setTimeout(() => {
      if (timeLeft.value > 0) {
        generateNewPattern()
      }
    }, 1500)
  }

  const getOptionClass = (option) => {
    if (!feedback.value.type) return ''
    
    if (option === correctAnswer.value) {
      return 'correct'
    } else if (feedback.value.type === 'incorrect' && option === selectedAnswer) {
      return 'incorrect'
    }
    
    return ''
  }

  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    const audioAcerto = new Audio("/audio/acerto.wav");
    const audioErro = new Audio("/audio/erro.wav");

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    if (type === 'correct') {
      //oscillator.frequency.value = 800
      audioAcerto.play()
    } else {
      //oscillator.frequency.value = 500
      audioErro.play()
    }
    
    gainNode.gain.value = 0.1
    oscillator.start()
    
    setTimeout(() => {
      oscillator.stop()
    }, 300)
  }

  const endGame = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
    }
    gameFinished.value = true
  }

  const restartGame = () => {
    initGame()
  }

  const cleanup = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
    gameFinished.value = false
    isOptionDisabled.value = false
    feedback.value = { message: '', type: '' }
  }

  return {
    // Estado
    currentPattern,
    options,
    correctAnswer,
    score,
    errors,
    timeLeft,
    gameFinished,
    feedback,
    isOptionDisabled,
    responseTimes,

    // Getters
    formattedTime,
    averageTime,
    performanceText,
    performanceClass,

    // Ações
    initGame,
    selectAnswer,
    getOptionClass,
    restartGame,
    cleanup,
    endGame
  }
})