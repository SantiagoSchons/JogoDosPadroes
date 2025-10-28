<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Padrão em JOGO</h1>
        <p class="hero-subtitle">Desenvolva seu pensamento computacional através do reconhecimento de padrões</p>
        <router-link to="/game" class="btn btn-primary btn-large">
          Começar a Jogar
        </router-link>
      </div>
    </div>

    <div class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>Reconhecimento de Padrões</h3>
          <p>Identifique sequências lógicas em números, letras, formas e cores</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Raciocínio Rápido</h3>
          <p>Desafios cronometrados para desenvolver agilidade mental</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Feedback Detalhado</h3>
          <p>Acompanhe seu progresso com estatísticas de desempenho</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica específica do componente home (se houver)
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.hero-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 0;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-large {
  padding: 15px 40px;
  font-size: 1.1rem;
}

.features-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 60px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>