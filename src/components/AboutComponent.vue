<template>
  <div class="about">
    <div class="about-card">
      <h1 class="about-title">Sobre o Jogo</h1>
      
      <div class="about-content">
        <div class="about-section">
          <h2>🎯 Objetivo</h2>
          <p>
            O <strong>Padrão em JOGO</strong> é um jogo educativo desenvolvido para ensinar 
            e exercitar o reconhecimento de padrões, uma habilidade fundamental do 
            Pensamento Computacional conforme a BNCC.
          </p>
        </div>

        <div class="about-section">
          <h2>🧠 Pensamento Computacional</h2>
          <p>
            Desenvolvemos habilidades como decomposição de problemas, reconhecimento de padrões, 
            abstração e design de algoritmos através de desafios interativos e dinâmicos.
          </p>
        </div>

        <div class="about-section">
          <h2>📚 BNCC - Computação</h2>
          <p>
            Este jogo atende às competências específicas da Base Nacional Comum Curricular 
            para a área de Computação, promovendo o letramento digital e o desenvolvimento 
            do raciocínio lógico.
          </p>
        </div>

        <div class="features-list">
          <h3>Características do Jogo:</h3>
          <ul>
            <li>✅ Padrões variados (números, letras, formas, cores)</li>
            <li>✅ Tempo limitado para desenvolver agilidade mental</li>
            <li>✅ Feedback imediato e detalhado</li>
            <li>✅ Interface acessível e responsiva</li>
            <li>✅ Aleatoriedade garantida nos desafios</li>
          </ul>
        </div>

        <div class="back-home">
          <router-link to="/" class="btn btn-primary">
            Voltar ao Início
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lógica específica do componente about (se houver)
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 40px 0;
}

.about-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
}

.about-title {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 40px;
}

.about-section {
  margin-bottom: 30px;
}

.about-section h2 {
  color: var(--secondary-color);
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.about-section p {
  line-height: 1.6;
  color: #555;
  font-size: 1.1rem;
}

.features-list {
  background: var(--light-color);
  padding: 25px;
  border-radius: 12px;
  margin: 30px 0;
}

.features-list h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.features-list ul {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 8px 0;
  font-size: 1.1rem;
}

.back-home {
  text-align: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .about-card {
    padding: 20px;
    margin: 0 20px;
  }
  
  .about-title {
    font-size: 2rem;
  }
}
</style>