<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const auth = useAuth()

const email = ref('')
const password = ref('')

onMounted(() => auth.clearError())


async function onSubmit(e) {
  e.preventDefault()
  const { error } = await auth.signIn(email.value, password.value)
  if (!error) {
    router.push('/')
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Connexion</h1>
      <p class="auth-subtitle">Accédez à votre compte Kortex AI</p>

      <form @submit="onSubmit" class="auth-form">
        <div v-if="auth.error" class="form-error">{{ auth.error }}</div>
        <div class="form-group">
          <label for="login-email">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label for="login-password">Mot de passe</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>
        <button type="submit" class="btn btn-login btn-block" :disabled="auth.isLoading">
          <span v-if="auth.isLoading">Connexion en cours…</span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <p class="auth-footer">
        Pas encore de compte ?
        <router-link to="/inscription">Créer un compte</router-link>
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
  border-color: var(--accent-violet);
  box-shadow: 0 0 0 3px var(--accent-violet-subtle);
}
.form-error {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.12);
  border-radius: var(--radius);
  color: #dc2626;
  font-size: 0.9rem;
}
.btn-login {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius);
  background: var(--gradient);
  color: white;
}
.btn-login:disabled {
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
