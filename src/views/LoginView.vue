<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

const form = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function submit(e) {
  e.preventDefault()
  error.value = ''
  loading.value = true
  try {
    // Vérification préalable des variables d'environnement
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      error.value = 'Configuration manquante. Vérifiez votre fichier .env et redémarrez le serveur (npm run dev).'
      loading.value = false
      return
    }
    
    await auth.signIn(form.value.email, form.value.password)
    const redirect = route.query.redirect || '/tableau-de-bord'
    router.push(redirect)
  } catch (err) {
    // Messages d'erreur plus clairs
    if (err.message?.includes('Invalid login credentials')) {
      error.value = 'Email ou mot de passe incorrect.'
    } else if (err.message?.includes('Email not confirmed')) {
      error.value = 'Veuillez confirmer votre email avant de vous connecter.'
    } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
      error.value = 'Erreur de connexion. Vérifiez votre connexion internet et les variables d\'environnement.'
    } else {
      error.value = err.message || 'Erreur lors de la connexion. Veuillez réessayer.'
    }
    console.error('Erreur de connexion:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="py-6 sm:py-8 md:py-12 min-h-[60vh] flex items-center px-4 sm:px-6">
    <div class="container max-w-[420px] mx-auto w-full">
      <div class="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-4 sm:p-6 md:p-8">
        <h1 class="m-0 mb-1 text-2xl sm:text-3xl font-bold">Connexion</h1>
        <p class="m-0 mb-6 text-[var(--text-muted)] text-base">Accédez à votre tableau de bord Kortex AI.</p>

        <form class="mb-5" @submit="submit">
          <p v-if="error" class="m-0 mb-4 p-3 bg-[rgba(239,68,68,0.15)] text-[#f87171] rounded-[var(--radius)] text-sm">
            {{ error }}
          </p>
          <div class="mb-5">
            <label for="login-email" class="block mb-1.5 text-sm text-[var(--text-muted)]">Email</label>
            <input
              id="login-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="vous@exemple.com"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <div class="mb-5">
            <label for="login-password" class="block mb-1.5 text-sm text-[var(--text-muted)]">Mot de passe</label>
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <button type="submit" class="btn btn-primary w-full mt-2 disabled:opacity-70 disabled:cursor-not-allowed" :disabled="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <p class="m-0 text-center text-base text-[var(--text-muted)]">
          Pas encore de compte ?
          <router-link to="/inscription" class="text-[var(--accent-blue)] font-medium hover:underline">Créer un compte</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
