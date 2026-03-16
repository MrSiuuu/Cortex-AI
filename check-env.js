// Script de vérification des variables d'environnement
// Utilisation: node check-env.js

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_OPENAI_API_KEY',
  'VITE_N8N_WEBHOOK_CHATBOT_USER'
]

console.log('🔍 Vérification des variables d\'environnement...\n')

try {
  const envPath = join(__dirname, '.env')
  const envContent = readFileSync(envPath, 'utf-8')
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'))
  
  const envVars = {}
  envLines.forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      envVars[key] = value
    }
  })
  
  console.log('📋 Variables trouvées dans .env:\n')
  
  let allOk = true
  requiredVars.forEach(varName => {
    const value = envVars[varName]
    if (value && value.length > 0) {
      const displayValue = varName.includes('KEY') || varName.includes('SECRET')
        ? value.substring(0, 20) + '...'
        : value
      console.log(`  ✅ ${varName} = ${displayValue}`)
    } else {
      console.log(`  ❌ ${varName} = MANQUANT`)
      allOk = false
    }
  })
  
  console.log('\n')
  
  if (allOk) {
    console.log('✅ Toutes les variables sont présentes dans .env')
    console.log('\n⚠️  IMPORTANT: Si les variables ne fonctionnent pas dans l\'application:')
    console.log('   1. Arrêtez le serveur de développement (Ctrl+C)')
    console.log('   2. Redémarrez avec: npm run dev')
    console.log('   3. Les variables sont chargées uniquement au démarrage du serveur\n')
  } else {
    console.log('❌ Certaines variables sont manquantes')
    console.log('   Vérifiez votre fichier .env\n')
  }
  
  // Vérifications supplémentaires
  if (envVars.VITE_SUPABASE_URL && !envVars.VITE_SUPABASE_URL.startsWith('http')) {
    console.log('⚠️  ATTENTION: VITE_SUPABASE_URL doit commencer par https://\n')
  }
  
  if (envVars.VITE_SUPABASE_ANON_KEY && envVars.VITE_SUPABASE_ANON_KEY.length < 50) {
    console.log('⚠️  ATTENTION: VITE_SUPABASE_ANON_KEY semble trop courte\n')
  }
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('❌ Fichier .env introuvable')
    console.log('   Créez un fichier .env à la racine du projet\n')
  } else {
    console.error('❌ Erreur lors de la lecture du fichier .env:', error.message)
  }
  process.exit(1)
}
