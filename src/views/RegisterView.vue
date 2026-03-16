<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()

const form = ref({
  firstName: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
const error = ref('')
const loading = ref(false)

const passwordsMatch = computed(() =>
  form.value.password && form.value.password === form.value.passwordConfirm
)

async function submit(e) {
  e.preventDefault()
  error.value = ''
  if (form.value.password !== form.value.passwordConfirm) {
    error.value = 'Les deux mots de passe doivent être identiques.'
    return
  }
  if (form.value.password.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }
  loading.value = true
  try {
    await auth.signUp(form.value.email, form.value.password, {
      first_name: form.value.firstName.trim() || undefined
    })
    router.push('/tableau-de-bord')
  } catch (err) {
    error.value = err.message || 'Impossible de créer le compte.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="py-6 sm:py-8 md:py-12 min-h-[60vh] flex items-center">
    <div class="container max-w-[420px] mx-auto w-full">
      <div class="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-7 md:p-8">
        <h1 class="m-0 mb-1 text-2xl sm:text-3xl font-bold">Créer un compte</h1>
        <p class="m-0 mb-6 text-[var(--text-muted)] text-base">Inscrivez-vous pour accéder à votre tableau de bord.</p>

        <form class="mb-5" @submit="submit">
          <p v-if="error" class="m-0 mb-4 p-3 bg-[rgba(239,68,68,0.15)] text-[#f87171] rounded-[var(--radius)] text-sm">
            {{ error }}
          </p>
          <div class="mb-5">
            <label for="reg-firstname" class="block mb-1.5 text-sm text-[var(--text-muted)]">Prénom</label>
            <input
              id="reg-firstname"
              v-model="form.firstName"
              type="text"
              autocomplete="given-name"
              placeholder="Votre prénom"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <div class="mb-5">
            <label for="reg-email" class="block mb-1.5 text-sm text-[var(--text-muted)]">Email</label>
            <input
              id="reg-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="vous@exemple.com"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <div class="mb-5">
            <label for="reg-password" class="block mb-1.5 text-sm text-[var(--text-muted)]">Mot de passe</label>
            <input
              id="reg-password"
              v-model="form.password"
              type="password"
              required
              autocomplete="new-password"
              placeholder="••••••••"
              minlength="6"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <div class="mb-5">
            <label for="reg-password-confirm" class="block mb-1.5 text-sm text-[var(--text-muted)]">Confirmer le mot de passe</label>
            <input
              id="reg-password-confirm"
              v-model="form.passwordConfirm"
              type="password"
              required
              autocomplete="new-password"
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[var(--bg)] border border-[var(--border-subtle)] rounded-[var(--radius)] text-[var(--text)] text-base min-h-11 box-border focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)]"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-full mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="loading || !passwordsMatch"
          >
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <p class="m-0 text-center text-base text-[var(--text-muted)]">
          Déjà un compte ?
          <router-link to="/connexion" class="text-[var(--accent-blue)] font-medium hover:underline">Se connecter</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
