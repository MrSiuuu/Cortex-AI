import { ref, shallowRef } from 'vue'
import { supabase } from '../lib/supabase'

// État global partagé (une seule session pour toute l'app)
const user = shallowRef(null)
const authReady = ref(false)
let authListener = null
let initDone = false
let readyResolve
const readyPromise = new Promise((r) => { readyResolve = r })

async function initAuth() {
  if (initDone) return
  initDone = true
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user ?? null
  authReady.value = true
  readyResolve()
  authListener = supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
}

function getReady() {
  if (!initDone) initAuth()
  return readyPromise
}

export function useAuth() {
  if (!authReady.value && !initDone) initAuth()

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
        data: metadata
      }
    })
    if (error) throw error
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
  }

  return {
    user,
    authReady,
    getReady,
    signIn,
    signUp,
    signOut
  }
}
