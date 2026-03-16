import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Vérification stricte des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  const missing = []
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL')
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY')
  
  console.error('❌ ERREUR: Variables d\'environnement manquantes:', missing.join(', '))
  console.error('📝 Vérifiez que votre fichier .env contient ces variables et redémarrez le serveur de développement (npm run dev)')
  
  // On crée quand même un client avec des valeurs par défaut pour éviter les crashes
  // mais il ne fonctionnera pas correctement
  console.warn('⚠️  Le client Supabase sera initialisé avec des valeurs invalides')
}

// Vérification du format de l'URL
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  console.error('❌ ERREUR: VITE_SUPABASE_URL doit commencer par https://')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Test de connexion au démarrage (optionnel, pour debug)
if (supabaseUrl && supabaseAnonKey) {
  console.log('✅ Supabase configuré:', supabaseUrl.replace(/https?:\/\/([^.]+).*/, '$1'))
}
