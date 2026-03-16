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
  <footer class="mt-12 sm:mt-16 py-8 sm:py-12 pb-[calc(1.5rem+env(safe-area-inset-bottom,0))] sm:pb-[calc(2rem+env(safe-area-inset-bottom,0))] border-t border-[var(--nav-border)] bg-[var(--section-bg)]">
    <div class="container text-center">
      <div class="mb-5 sm:mb-6">
        <span class="font-bold text-[var(--text)]">Kortex</span><span class="bg-[var(--gradient)] bg-clip-text text-transparent font-bold"> AI</span>
        <p class="mt-2 m-0 text-sm sm:text-base text-[var(--text-muted)]">L'IA au service de votre business © 2026</p>
      </div>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 sm:gap-6 mb-5 sm:mb-6">
        <a href="#" class="text-[var(--text-muted)] text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#services')">Services</a>
        <a href="#" class="text-[var(--text-muted)] text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#tarifs')">Tarifs</a>
        <a href="#" class="text-[var(--text-muted)] text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#contact')">Contact</a>
        <router-link to="/connexion" class="text-[var(--text-muted)] text-base hover:text-[var(--accent-violet)] transition-colors">Connexion</router-link>
        <router-link to="/inscription" class="text-[var(--text-muted)] text-base hover:text-[var(--accent-violet)] transition-colors">Créer un compte</router-link>
      </div>
      <p class="text-sm text-[var(--text-muted)] m-0">
        <a href="#" class="text-[var(--text-muted)]">Mentions légales</a> · Propulsé par Kortex AI
      </p>
    </div>
  </footer>
</template>
