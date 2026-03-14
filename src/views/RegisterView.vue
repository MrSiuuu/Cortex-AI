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
  <div class="auth-page">
    <div class="container auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Créer un compte</h1>
        <p class="auth-subtitle">Inscrivez-vous pour accéder à votre tableau de bord.</p>

        <form class="auth-form" @submit="submit">
          <p v-if="error" class="form-error">{{ error }}</p>
          <div class="form-group">
            <label for="reg-firstname">Prénom</label>
            <input
              id="reg-firstname"
              v-model="form.firstName"
              type="text"
              autocomplete="given-name"
              placeholder="Votre prénom"
            />
          </div>
          <div class="form-group">
            <label for="reg-email">Email</label>
            <input
              id="reg-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="vous@exemple.com"
            />
          </div>
          <div class="form-group">
            <label for="reg-password">Mot de passe</label>
            <input
              id="reg-password"
              v-model="form.password"
              type="password"
              required
              autocomplete="new-password"
              placeholder="••••••••"
              minlength="6"
            />
          </div>
          <div class="form-group">
            <label for="reg-password-confirm">Confirmer le mot de passe</label>
            <input
              id="reg-password-confirm"
              v-model="form.passwordConfirm"
              type="password"
              required
              autocomplete="new-password"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :disabled="loading || !passwordsMatch"
          >
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <p class="auth-footer">
          Déjà un compte ?
          <router-link to="/connexion">Se connecter</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  padding: 1.5rem 0 2.5rem;
  min-height: 60vh;
  display: flex;
  align-items: center;
}
@media (min-width: 480px) {
  .auth-page {
    padding: 2rem 0 3rem;
  }
}
@media (min-width: 768px) {
  .auth-page {
    padding: 3rem 0 4rem;
  }
}

.auth-container {
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
}

.auth-card {
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
}
@media (min-width: 480px) {
  .auth-card {
    padding: 1.75rem;
  }
}
@media (min-width: 768px) {
  .auth-card {
    padding: 2rem;
  }
}

.auth-title {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
}
@media (min-width: 480px) {
  .auth-title {
    font-size: 1.75rem;
  }
}

.auth-subtitle {
  margin: 0 0 1.5rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.auth-form {
  margin-bottom: 1.25rem;
}

.form-error {
  margin: 0 0 1rem;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border-radius: var(--radius);
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.form-group input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  background: var(--bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 1rem;
  min-height: 44px;
  box-sizing: border-box;
}
@media (min-width: 480px) {
  .form-group input {
    padding: 0.75rem 1rem;
  }
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-violet);
  box-shadow: 0 0 0 3px var(--accent-violet-subtle);
}

.btn-block {
  width: 100%;
  margin-top: 0.5rem;
}

.auth-footer {
  margin: 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.auth-footer a {
  color: var(--accent-blue);
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
