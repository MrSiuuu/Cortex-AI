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
  <div class="dashboard-page">
    <div class="container dashboard-container">
      <header class="dashboard-header">
        <h1 class="dashboard-greeting">Salut {{ displayName || 'toi' }}</h1>
        <p class="dashboard-welcome">
          Bienvenue sur ton tableau de bord Kortex AI. Tu peux gérer ton espace et accéder à tes outils depuis ici.
        </p>
      </header>

      <div class="dashboard-grid">
        <section class="dashboard-card dashboard-card-main">
          <h2 class="dashboard-card-title">Votre espace</h2>
          <p class="dashboard-text">
            Votre espace utilisateur Kortex AI. Les fonctionnalités à venir (conversations, paramètres) seront accessibles ici.
          </p>
          <p v-if="email" class="dashboard-email">Connecté avec : {{ email }}</p>
        </section>

        <section class="dashboard-card dashboard-card-actions">
          <h2 class="dashboard-card-title">Compte</h2>
          <button type="button" class="btn btn-ghost btn-block btn-logout" @click="signOut">
            Se déconnecter
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 1.5rem 0 2.5rem;
  min-height: 60vh;
}
@media (min-width: 480px) {
  .dashboard-page {
    padding: 2rem 0 3rem;
  }
}
@media (min-width: 768px) {
  .dashboard-page {
    padding: 2rem 0 4rem;
  }
}

.dashboard-container {
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

.dashboard-header {
  margin-bottom: 1.5rem;
}
@media (min-width: 480px) {
  .dashboard-header {
    margin-bottom: 2rem;
  }
}

.dashboard-greeting {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}
@media (min-width: 480px) {
  .dashboard-greeting {
    font-size: 1.65rem;
  }
}
@media (min-width: 768px) {
  .dashboard-greeting {
    font-size: 1.75rem;
  }
}

.dashboard-welcome {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}
@media (min-width: 480px) {
  .dashboard-welcome {
    font-size: 1rem;
  }
}

.dashboard-grid {
  display: grid;
  gap: 1.5rem;
}

.dashboard-card {
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}
@media (min-width: 480px) {
  .dashboard-card {
    padding: 1.5rem;
  }
}

.dashboard-card-title {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.dashboard-text {
  margin: 0 0 1rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.dashboard-email {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.dashboard-card-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-block {
  width: 100%;
}

.btn-logout {
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  min-height: 44px;
}

.btn-logout:hover {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.3);
}

@media (min-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-card-main {
    grid-column: span 1;
  }
}
</style>
