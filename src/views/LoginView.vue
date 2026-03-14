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
    await auth.signIn(form.value.email, form.value.password)
    const redirect = route.query.redirect || '/tableau-de-bord'
    router.push(redirect)
  } catch (err) {
    error.value = err.message || 'Identifiants incorrects.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="container auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Connexion</h1>
        <p class="auth-subtitle">Accédez à votre tableau de bord Kortex AI.</p>

        <form class="auth-form" @submit="submit">
          <p v-if="error" class="form-error">{{ error }}</p>
          <div class="form-group">
            <label for="login-email">Email</label>
            <input
              id="login-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              placeholder="vous@exemple.com"
            />
          </div>
          <div class="form-group">
            <label for="login-password">Mot de passe</label>
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <p class="auth-footer">
          Pas encore de compte ?
          <router-link to="/inscription">Créer un compte</router-link>
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
