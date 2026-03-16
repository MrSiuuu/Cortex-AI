<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()
const menuOpen = ref(false)

const isLoggedIn = computed(() => {
  const ready = auth.authReady?.value ?? auth.authReady
  const u = auth.user?.value ?? auth.user
  return !!ready && !!u?.email
})
const displayName = computed(() => {
  const u = auth.user?.value ?? auth.user
  if (!u) return ''
  const first = u.user_metadata?.first_name
  if (first) return first
  return u.email ?? ''
})

const navLinks = [
  { name: 'Accueil', to: '/', hash: '#accueil' },
  { name: 'Formation IA', to: '/formation', hash: null },
  { name: 'Services', to: '/', hash: '#services' },
  { name: 'Tarifs', to: '/', hash: '#tarifs' },
  { name: 'Contact', to: '/', hash: '#contact' }
]

function goTo(link) {
  menuOpen.value = false
  if (link.hash) {
    if (router.currentRoute.value.path === link.to) {
      const el = document.querySelector(link.hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(link.to + link.hash).then(() => {
        setTimeout(() => document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
      })
    }
  } else {
    router.push(link.to)
  }
}
</script>

<template>
  <header class="sticky top-0 z-[100] bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)]">
    <div class="container flex items-center justify-between min-h-14 sm:min-h-16 md:min-h-18 pt-[env(safe-area-inset-top,0)] h-auto px-4 sm:px-6">
      <router-link to="/" class="text-lg sm:text-xl md:text-2xl font-bold no-underline text-[var(--text)]">
        <span>Kortex</span><span class="bg-[var(--gradient)] bg-clip-text text-transparent"> AI</span>
      </router-link>

      <nav 
        class="hidden lg:flex items-center gap-4 xl:gap-6"
        :class="{
          '!flex lg:!flex fixed top-14 sm:top-16 md:top-18 left-0 right-0 bottom-0 flex-col items-center justify-center gap-4 sm:gap-5 p-4 sm:p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0))] bg-[var(--bg)] border-t border-[var(--nav-border)] overflow-y-auto': menuOpen
        }"
      >
        <a
          v-for="link in navLinks"
          :key="link.name"
          href="#"
          class="text-[var(--text-muted)] text-sm sm:text-base hover:text-[var(--text)] transition-colors whitespace-nowrap"
          :class="{
            'text-base sm:text-lg py-2': menuOpen
          }"
          @click.prevent="goTo(link)"
        >
          {{ link.name }}
        </a>
        <template v-if="isLoggedIn">
          <router-link 
            to="/tableau-de-bord" 
            class="text-[var(--text-muted)] text-base hover:text-[var(--text)] transition-colors"
            :class="{
              'text-lg py-2': menuOpen
            }"
            @click="menuOpen = false"
          >
            Tableau de bord
          </router-link>
          <span 
            class="text-sm text-[var(--text-muted)]"
            :class="{
              'text-base break-words text-center': menuOpen
            }"
          >
            {{ displayName }}
          </span>
          <button 
            type="button" 
            class="btn btn-ghost"
            :class="{
              'min-h-11 py-2.5 px-5': menuOpen
            }"
            @click="auth.signOut(); router.push('/')"
          >
            Déconnexion
          </button>
        </template>
        <template v-else>
          <router-link 
            to="/connexion" 
            class="btn btn-ghost"
            :class="{
              'min-h-11 py-2.5 px-5': menuOpen
            }"
            @click="menuOpen = false"
          >
            Connexion
          </router-link>
          <router-link 
            to="/inscription" 
            class="btn btn-register"
            :class="{
              'min-h-11 py-2.5 px-5': menuOpen
            }"
            @click="menuOpen = false"
          >
            Créer un compte
          </router-link>
        </template>
      </nav>

      <div class="header-actions">
        <button
          type="button"
          class="flex flex-col gap-1.5 bg-transparent p-2 lg:hidden"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="w-6 h-0.5 bg-[var(--text)] rounded-sm transition-transform duration-300"></span>
          <span class="w-6 h-0.5 bg-[var(--text)] rounded-sm transition-transform duration-300"></span>
          <span class="w-6 h-0.5 bg-[var(--text)] rounded-sm transition-transform duration-300"></span>
        </button>
      </div>
    </div>
  </header>
</template>
