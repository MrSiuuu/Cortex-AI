<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref('')

onMounted(() => auth.clearError())

async function onSubmit(e) {
  e.preventDefault()
  localError.value = ''
  if (password.value !== confirmPassword.value) {
    localError.value = 'Les deux mots de passe ne correspondent pas.'
    return
  }
  if (password.value.length < 6) {
    localError.value = 'Le mot de passe doit faire au moins 6 caractères.'
    return
  }
  const { error } = await auth.signUp(email.value, password.value)
  if (!error) router.push('/')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Créer un compte</h1>
      <p class="auth-subtitle">Rejoignez Kortex AI</p>

      <form @submit="onSubmit" class="auth-form">
        <div v-if="localError || auth.error" class="form-error">
          {{ localError || auth.error }}
        </div>
        <div class="form-group">
          <label for="reg-email">Email</label>
          <input
            id="reg-email"
            v-model="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label for="reg-password">Mot de passe</label>
          <input
            id="reg-password"
            v-model="password"
            type="password"
            required
            minlength="6"
            placeholder="••••••••"
            autocomplete="new-password"
          />
        </div>
        <div class="form-group">
          <label for="reg-confirm">Confirmer le mot de passe</label>
          <input
            id="reg-confirm"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            autocomplete="new-password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-register-page btn-block"
          :disabled="auth.isLoading"
        >
          <span v-if="auth.isLoading">Création en cours…</span>
          <span v-else>Créer mon compte</span>
        </button>
      </form>

      <p class="auth-footer">
        Déjà un compte ?
        <router-link to="/connexion">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 72px - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.auth-title {
  font-size: 1.75rem;
  margin: 0 0 0.25rem;
  color: var(--text);
  font-weight: 700;
}
.auth-subtitle {
  color: var(--text-muted);
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
}

.auth-form .form-group {
  margin-bottom: 1.25rem;
}
.auth-form .form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}
.auth-form .form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-accent);
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
}
.auth-form .form-group input:focus {
  outline: none;
  border-color: var(--accent-green);
  box-shadow: 0 0 0 3px var(--accent-green-subtle);
}

.form-error {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.12);
  border-radius: var(--radius);
  color: #dc2626;
  font-size: 0.9rem;
  line-height: 1.4;
}

.btn-register-page {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius);
  background: var(--accent-green);
  color: #fff;
}
.btn-register-page:hover:not(:disabled) {
  background: #16a34a;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);
}
.btn-register-page:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.auth-footer {
  margin: 1.5rem 0 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-muted);
}
.auth-footer a {
  color: var(--accent-violet);
  font-weight: 500;
}
</style>
