<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id) {
  if (router.currentRoute.value.path !== '/') router.push('/').then(() => {
    setTimeout(() => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
  })
  else document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="logo-text">Kortex</span><span class="logo-ai"> AI</span>
        <p class="tagline">L'IA au service de votre business © 2026</p>
      </div>
      <div class="footer-links">
        <a href="#" @click.prevent="scrollTo('#services')">Services</a>
        <a href="#" @click.prevent="scrollTo('#tarifs')">Tarifs</a>
        <a href="#" @click.prevent="scrollTo('#contact')">Contact</a>
        <router-link to="/connexion">Connexion</router-link>
        <router-link to="/inscription">Créer un compte</router-link>
      </div>
      <p class="footer-legal">
        <a href="#">Mentions légales</a> · Propulsé par Kortex AI
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 3rem;
  padding: 2rem 0 1.5rem;
  padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0));
  border-top: 1px solid var(--nav-border);
  background: var(--section-bg);
}
@media (min-width: 480px) {
  .footer {
    margin-top: 4rem;
    padding: 3rem 0 2rem;
    padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0));
  }
}

.footer-inner {
  text-align: center;
}

.footer-brand {
  margin-bottom: 1.25rem;
}
@media (min-width: 480px) {
  .footer-brand {
    margin-bottom: 1.5rem;
  }
}

.logo-text { font-weight: 700; color: var(--text); }
.logo-ai {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.tagline {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}
@media (min-width: 480px) {
  .tagline {
    font-size: 0.9rem;
  }
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1.25rem;
}
@media (min-width: 480px) {
  .footer-links {
    gap: 1rem 1.5rem;
    margin-bottom: 1.5rem;
  }
}
.footer-links a {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.footer-links a:hover {
  color: var(--accent-violet);
}

.footer-legal {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}
.footer-legal a {
  color: var(--text-muted);
}
</style>
