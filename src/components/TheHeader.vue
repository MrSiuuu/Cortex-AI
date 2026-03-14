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
  { name: 'Services', to: '/', hash: '#services' },
  { name: 'Comment ça marche', to: '/', hash: '#comment-ca-marche' },
  { name: 'Tarifs', to: '/', hash: '#tarifs' },
  { name: 'Contact', to: '/', hash: '#contact' }
]

function goTo(hash) {
  menuOpen.value = false
  if (router.currentRoute.value.path === '/' && hash) {
    const el = document.querySelector(hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/' + (hash ? '#' + hash.slice(1) : '')).then(() => {
      setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
  }
}

</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <span class="logo-text">Kortex</span><span class="logo-ai"> AI</span>
      </router-link>

      <nav class="nav" :class="{ open: menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.name"
          href="#"
          class="nav-link"
          @click.prevent="goTo(link.hash)"
        >
          {{ link.name }}
        </a>
        <template v-if="isLoggedIn">
          <router-link to="/tableau-de-bord" class="nav-link" @click="menuOpen = false">
            Tableau de bord
          </router-link>
          <span class="nav-user">{{ displayName }}</span>
          <button type="button" class="btn btn-ghost" @click="auth.signOut(); router.push('/')">
            Déconnexion
          </button>
        </template>
        <template v-else>
          <router-link to="/connexion" class="btn btn-ghost" @click="menuOpen = false">
            Connexion
          </router-link>
          <router-link to="/inscription" class="btn btn-register" @click="menuOpen = false">
            Créer un compte
          </router-link>
        </template>
      </nav>

      <div class="header-actions">
        <button
          type="button"
          class="burger"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--nav-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  height: auto;
  padding-top: env(safe-area-inset-top, 0);
}
@media (min-width: 480px) {
  .header-inner {
    min-height: 72px;
  }
}

.logo {
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text);
}
@media (min-width: 480px) {
  .logo {
    font-size: 1.5rem;
  }
}
.logo-ai {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.nav-link:hover {
  color: var(--text);
}

.nav-user {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 500;
}
.btn-ghost {
  background: transparent;
  color: var(--text-muted);
}
.btn-ghost:hover {
  color: var(--text);
}
.btn-primary {
  background: var(--gradient);
  color: white;
  box-shadow: var(--glow-violet);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.45);
}
.btn-register {
  background: var(--accent-green);
  color: #fff;
}
.btn-register:hover {
  background: #16a34a;
  transform: translateY(-1px);
}

.burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 8px;
}
.burger span {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transition: transform 0.3s;
}

@media (min-width: 900px) {
  .nav {
    display: flex;
  }
  .burger {
    display: none;
  }
}

@media (max-width: 899px) {
  .nav.open {
    display: flex;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    padding: 1.5rem 1rem calc(1.5rem + env(safe-area-inset-bottom, 0));
    background: var(--bg);
    border-top: 1px solid var(--nav-border);
    overflow-y: auto;
  }
  @media (min-width: 480px) {
    .nav.open {
      top: 72px;
    }
  }
  .nav.open .nav-link {
    font-size: 1.05rem;
    padding: 0.5rem 0;
  }
  .nav.open .nav-user {
    font-size: 0.95rem;
    word-break: break-word;
    text-align: center;
  }
  .nav.open .btn {
    min-height: 44px;
    padding: 0.6rem 1.25rem;
  }
}
</style>
