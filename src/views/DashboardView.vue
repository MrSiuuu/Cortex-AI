<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()

const displayName = computed(() => {
  const u = auth.user?.value ?? auth.user
  if (!u) return ''
  const first = u.user_metadata?.first_name
  if (first) return first
  return u.email ?? ''
})

const email = computed(() => {
  const u = auth.user?.value ?? auth.user
  return u?.email ?? ''
})

async function signOut() {
  await auth.signOut()
  router.push('/')
}
</script>

<template>
  <div class="py-6 sm:py-8 md:py-16 min-h-[60vh] px-4 sm:px-6">
    <div class="container max-w-[720px] mx-auto w-full">
      <header class="mb-6 sm:mb-8">
        <h1 class="m-0 mb-2 text-xl sm:text-2xl md:text-[1.75rem] font-bold">Salut {{ displayName || 'toi' }}</h1>
        <p class="m-0 text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
          Bienvenue sur ton tableau de bord Kortex AI. Tu peux gérer ton espace et accéder à tes outils depuis ici.
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <section class="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-6">
          <h2 class="m-0 mb-3 text-lg font-semibold">Votre espace</h2>
          <p class="m-0 mb-4 text-[var(--text-muted)] leading-relaxed text-base">
            Votre espace utilisateur Kortex AI. Les fonctionnalités à venir (conversations, paramètres) seront accessibles ici.
          </p>
          <p v-if="email" class="m-0 text-sm text-[var(--text-muted)]">Connecté avec : {{ email }}</p>
        </section>

        <section class="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-6 flex flex-col gap-3">
          <h2 class="m-0 mb-3 text-lg font-semibold">Compte</h2>
          <button 
            type="button" 
            class="btn btn-ghost w-full border border-[var(--border-subtle)] text-[var(--text-muted)] min-h-11 hover:text-[#f87171] hover:border-[rgba(248,113,113,0.3)] transition-colors" 
            @click="signOut"
          >
            Se déconnecter
          </button>
        </section>
      </div>
    </div>
  </div>
</template>
