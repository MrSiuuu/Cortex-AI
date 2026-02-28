import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

const user = ref(null)
const authReady = ref(false)

/**
 * Vérifie si une session Supabase existe dans le localStorage.
 * Supabase utilise la clé : sb-<projectRef>-auth-token
 * Sans cette clé, on considère l'utilisateur déconnecté (évite "Déconnexion" fantôme).
 */
function hasSupabaseSessionInStorage() {
  if (typeof localStorage === 'undefined') return false
  const url = import.meta.env.VITE_SUPABASE_URL || ''
  if (!url) return false
  try {
    const projectRef = new URL(url).hostname.split('.')[0]
    const key = `sb-${projectRef}-auth-token`
    return localStorage.getItem(key) != null
  } catch {
    return false
  }
}

export function useAuth() {
  const isLoading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!user.value)

  async function init() {
    try {
      const hasStorage = hasSupabaseSessionInStorage()
      if (!hasStorage) {
        user.value = null
        authReady.value = true
        supabase.auth.onAuthStateChange((_event, session) => {
          user.value = session?.user ?? null
        })
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        user.value = null
      } else {
        user.value = session.user
      }
    } catch {
      user.value = null
    }
    authReady.value = true
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!hasSupabaseSessionInStorage()) {
        user.value = null
        return
      }
      user.value = session?.user ?? null
    })
    authReady.value = true
  }

  async function signUp(email, password, metadata = {}) {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      })
      if (err) {
        error.value = getErrorMessage(err)
        return { data: null, error: err }
      }
      user.value = data.user
      return { data, error: null }
    } finally {
      isLoading.value = false
    }
  }

  function getErrorMessage(err) {
    if (!err) return ''
    const msg = err.message || ''
    if (msg.includes('Email not confirmed') || msg.includes('email_not_confirmed')) {
      return 'Compte non confirmé. Vérifiez votre boîte mail et cliquez sur le lien reçu (ou désactivez "Confirm email" dans Supabase > Authentication > Providers > Email).'
    }
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
      return 'Email ou mot de passe incorrect.'
    }
    return msg
  }

  async function signIn(email, password) {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) {
        error.value = getErrorMessage(err)
        return { data: null, error: err }
      }
      user.value = data.user
      return { data, error: null }
    } finally {
      isLoading.value = false
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  function clearError() {
    error.value = null
  }

  return {
    user: computed(() => user.value),
    authReady: computed(() => authReady.value),
    isLoggedIn,
    isLoading,
    error,
    init,
    signUp,
    signIn,
    signOut,
    clearError
  }
}
