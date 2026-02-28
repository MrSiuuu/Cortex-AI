<script setup>
function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header id="accueil" class="home-header">
    <div class="container home-header-inner">
      <!-- Colonne gauche : mock chat Kortex -->
      <div class="home-header-left">
        <div class="chat-mock">
          <div class="chat-mock-header">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="chat-mock-title">Kortex</span>
          </div>
          <div class="chat-mock-body">
            <p class="msg bot">Salut ! Je suis l'assistant IA de Kortex AI. Comment puis-je vous aider ?</p>
            <p class="msg user">Je cherche un chatbot pour mon site.</p>
            <p class="msg bot">Super ! On a plusieurs offres. Vous avez déjà un site web ?</p>
          </div>
        </div>
      </div>

      <!-- Colonne droite : titre, sous-titre, CTA -->
      <div class="home-header-right">
        <h1 class="home-header-title">
          Votre business,<br />
          <span class="gradient-text">automatisé par l'IA</span>
        </h1>
        <p class="home-header-subtitle">
          Chatbots intelligents, automatisation de workflows, sites web — à prix accessible.
        </p>
        <div class="home-header-cta">
          <button type="button" class="btn btn-primary btn-lg" @click="scrollTo('#services')">
            Voir nos offres
          </button>
          <button type="button" class="btn btn-outline btn-lg" @click="scrollTo('#contact')">
            Parler à notre IA
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.home-header {
  padding: 4rem 0 5rem;
  position: relative;
  overflow: hidden;
}
.home-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 80%;
  background: radial-gradient(ellipse, var(--hero-glow) 0%, transparent 60%);
  pointer-events: none;
}

.home-header-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  min-height: 380px;
}
@media (max-width: 900px) {
  .home-header-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  .home-header-left {
    order: 1;
  }
  .home-header-right {
    order: 2;
  }
  .home-header-cta {
    justify-content: center;
  }
}

.home-header-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-header-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-header-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  margin: 0 0 1rem;
  line-height: 1.15;
  color: var(--text);
  text-align: left;
}
@media (max-width: 900px) {
  .home-header-title {
    text-align: center;
  }
}
.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-header-subtitle {
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  color: var(--text-muted);
  margin: 0 0 1.5rem;
  line-height: 1.6;
  text-align: left;
}
@media (max-width: 900px) {
  .home-header-subtitle {
    text-align: center;
  }
}

.home-header-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
@media (max-width: 900px) {
  .home-header-cta {
    justify-content: center;
  }
}

.btn-lg {
  padding: 0.85rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
}
.btn-outline {
  background: transparent;
  color: var(--accent-violet);
  border: 2px solid var(--accent-violet);
}
.btn-outline:hover {
  background: var(--accent-violet-subtle);
  box-shadow: var(--glow-violet);
}

.chat-mock {
  width: 100%;
  max-width: 380px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-accent);
  box-shadow: var(--glow-violet);
  overflow: hidden;
}
.chat-mock-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--accent-violet-subtle);
  border-bottom: 1px solid var(--border-accent);
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}
.chat-mock-title {
  margin-left: auto;
  font-weight: 600;
  color: var(--accent-violet);
}
.chat-mock-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.msg {
  margin: 0;
  font-size: 0.9rem;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  max-width: 85%;
}
.msg.bot {
  align-self: flex-start;
  background: var(--accent-blue-subtle);
  color: var(--text);
}
.msg.user {
  align-self: flex-end;
  background: var(--accent-violet);
  color: white;
}
</style>
