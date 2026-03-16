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
  <footer class="mt-12 sm:mt-16 py-6 sm:py-8 md:py-12 pb-[calc(1.5rem+env(safe-area-inset-bottom,0))] sm:pb-[calc(2rem+env(safe-area-inset-bottom,0))] border-t border-[var(--nav-border)] bg-[var(--section-bg)]">
    <div class="container text-center px-4 sm:px-6">
      <div class="mb-4 sm:mb-5 md:mb-6">
        <span class="text-lg sm:text-xl font-bold text-[var(--text)]">Kortex</span><span class="bg-[var(--gradient)] bg-clip-text text-transparent font-bold"> AI</span>
        <p class="mt-2 m-0 text-xs sm:text-sm md:text-base text-[var(--text-muted)]">L'IA au service de votre business © 2026</p>
      </div>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-5 md:mb-6">
        <a href="#" class="text-[var(--text-muted)] text-xs sm:text-sm md:text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#services')">Services</a>
        <a href="#" class="text-[var(--text-muted)] text-xs sm:text-sm md:text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#tarifs')">Tarifs</a>
        <a href="#" class="text-[var(--text-muted)] text-xs sm:text-sm md:text-base hover:text-[var(--accent-violet)] transition-colors" @click.prevent="scrollTo('#contact')">Contact</a>
        <router-link to="/connexion" class="text-[var(--text-muted)] text-xs sm:text-sm md:text-base hover:text-[var(--accent-violet)] transition-colors">Connexion</router-link>
        <router-link to="/inscription" class="text-[var(--text-muted)] text-xs sm:text-sm md:text-base hover:text-[var(--accent-violet)] transition-colors">Créer un compte</router-link>
      </div>
      <p class="text-xs sm:text-sm text-[var(--text-muted)] m-0">
        <a href="#" class="text-[var(--text-muted)] hover:text-[var(--accent-violet)] transition-colors">Mentions légales</a> · Propulsé par Kortex AI
      </p>
    </div>
  </footer>
</template>
