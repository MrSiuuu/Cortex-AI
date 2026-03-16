<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Fonction pour le scroll
function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Chat animation ─────────────────────────────────────
const conversation = [
  { side: 'left',  text: "Salut ! Je suis l'assistant IA de Kortex AI. Comment puis-je vous aider ?" },
  { side: 'right', text: "Je cherche un chatbot pour mon site e-commerce." },
  { side: 'left',  text: "Super choix ! Vous voulez qu'il réponde aux questions clients ou qu'il qualifie les leads ?" },
  { side: 'right', text: "Les deux si possible ! 😄" },
  { side: 'left',  text: "Parfait, on fait ça avec n8n + une IA connectée à votre catalogue. Délai : 48h." },
  { side: 'right', text: "C'est rapide ! Vous avez des exemples ?" },
  { side: 'left',  text: "Oui, je vous envoie une démo live maintenant. Vous allez adorer 🚀" },
]

const visibleMessages = ref([])
const isTyping = ref(false)
const currentPlaceholder = ref('Décrivez votre projet...')

let timeouts = []
let phInterval = null

const placeholders = [
  'Décrivez votre projet...',
  'Je veux automatiser mes emails...',
  'Un chatbot pour mon e-commerce...',
  'Créer un site avec IA intégrée...',
]
let phIdx = 0

function clearAll() {
  timeouts.forEach(clearTimeout)
  timeouts = []
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay)
  timeouts.push(id)
}

function runConversation() {
  visibleMessages.value = []
  isTyping.value = false
  let t = 600

  conversation.forEach((msg, i) => {
    if (msg.side === 'left') {
      schedule(() => { isTyping.value = true }, t)
      t += 1100
      schedule(() => {
        isTyping.value = false
        visibleMessages.value.push({ ...msg, entering: true })
        setTimeout(() => {
          if (visibleMessages.value[i]) visibleMessages.value[i].entering = false
        }, 400)
      }, t)
    } else {
      schedule(() => {
        visibleMessages.value.push({ ...msg, entering: true })
        setTimeout(() => {
          if (visibleMessages.value[i]) visibleMessages.value[i].entering = false
        }, 400)
      }, t)
    }
    t += msg.side === 'left' ? 1600 : 900
  })

  schedule(() => { runConversation() }, t + 2500)
}

onMounted(() => {
  runConversation()
  phInterval = setInterval(() => {
    phIdx = (phIdx + 1) % placeholders.length
    currentPlaceholder.value = placeholders[phIdx]
  }, 3000)
})

onUnmounted(() => {
  clearAll()
  if (phInterval) clearInterval(phInterval)
})

// Données pour les offres
const offers = [
  {
    id: 1,
    title: 'Chatbot IA Site Web',
    desc: 'Chatbot qui connaît votre business et répond à vos clients 24/7',
    features: [
      'Dashboard pour suivre les conversations',
      'Widget personnalisable aux couleurs de votre site',
      'Réponses en plusieurs langues'
    ],
    price: '500€',
    maintenance: '99€/mois'
  },
  {
    id: 2,
    title: 'Chatbot Agent IA',
    desc: 'Tout l\'Offre 1 + automatisations avancées',
    features: [
      'Prise de rendez-vous automatique',
      'Recherche dans votre catalogue produits',
      'Envoi de devis et emails automatiques',
      'Notification en temps réel quand un client a besoin de vous'
    ],
    price: '1 000€',
    maintenance: '149€/mois',
    popular: true
  },
  {
    id: 3,
    title: 'Chatbot WhatsApp Business',
    desc: 'Votre assistant IA directement sur WhatsApp',
    features: [
      'Vos clients vous écrivent sur WhatsApp, l\'IA répond',
      'Envoi de catalogue produits, prise de RDV, devis',
      'Idéal pour le marché africain'
    ],
    price: '800€',
    maintenance: '129€/mois'
  }
]

const extra = [
  { label: 'Création de site web vitrine', price: 'à partir de 300€' },
  { label: 'Automatisation de workflows (relance client, réponse mail, planning)', price: 'sur devis' },
  { label: 'Intégration IA sur site existant', price: 'sur devis' }
]

// Données pour les étapes
const steps = [
  { num: 1, title: 'Vous nous parlez de votre business', desc: 'Ou parlez à notre IA ci-dessous' },
  { num: 2, title: 'On configure votre chatbot IA en 48h', desc: 'Personnalisation et formation sur vos données' },
  { num: 3, title: "On l'installe sur votre site", desc: "Une ligne de code à copier-coller" },
  { num: 4, title: 'Vos clients sont accompagnés 24/7', desc: "Vous recevez les résumés et les leads" }
]

// Données pour les tarifs
const plans = [
  { name: 'Chatbot IA Site Web', setup: '500€', monthly: '99€', features: ['Widget personnalisable', 'Dashboard', 'Multi-langue'] },
  { name: 'Chatbot Agent IA', setup: '1 000€', monthly: '149€', popular: true, features: ['Tout Offre 1', 'RDV auto', 'Catalogue', 'Notifications'] },
  { name: 'Chatbot WhatsApp', setup: '800€', monthly: '129€', features: ['Réponses WhatsApp', 'Catalogue', 'RDV & devis'] }
]

// Données pour la FAQ
const openId = ref(null)
const faqs = [
  {
    id: 1,
    q: 'Combien de temps pour mettre en place un chatbot ?',
    a: 'En général 48h après validation du brief. On configure le bot, on le forme sur vos contenus, puis on vous donne une ligne de code à intégrer sur votre site.'
  },
  {
    id: 2,
    q: 'Le chatbot comprend-il plusieurs langues ?',
    a: 'Oui. Nos chatbots peuvent répondre en français, anglais et d\'autres langues selon votre besoin. On configure les langues au démarrage.'
  },
  {
    id: 3,
    q: 'Que se passe-t-il si un client pose une question à laquelle le bot ne sait pas répondre ?',
    a: 'Le bot peut transférer la conversation à un humain (vous) ou enregistrer la demande. Vous recevez une notification et pouvez répondre manuellement.'
  },
  {
    id: 4,
    q: 'La maintenance inclut-elle les mises à jour ?',
    a: 'Oui. La maintenance mensuelle inclut les mises à jour du modèle IA, la surveillance des conversations et le support technique pour les petits ajustements.'
  }
]

function toggle(id) {
  openId.value = openId.value === id ? null : id
}

// Données pour le formulaire de contact
const form = ref({
  name: '',
  email: '',
  message: ''
})
const sent = ref(false)
const sending = ref(false)

function submit(e) {
  e.preventDefault()
  sending.value = true
  // Placeholder : envoi formulaire (backend ou EmailJS plus tard)
  setTimeout(() => {
    sent.value = true
    sending.value = false
    form.value = { name: '', email: '', message: '' }
  }, 800)
}
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Header / Hero Section -->
    <header id="accueil" class="relative overflow-hidden min-h-screen flex items-center py-12 sm:py-16 md:py-20">
      <!-- Background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[650px] md:h-[650px] rounded-full top-[-20%] left-[-10%] sm:left-[-12%]"
          style="background: radial-gradient(circle, rgba(124,58,237,.18), transparent 70%); filter: blur(100px); animation: orbFloat 14s ease-in-out infinite;" />
        <div class="absolute w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[420px] md:h-[420px] rounded-full bottom-[-5%] right-[3%]"
          style="background: radial-gradient(circle, rgba(16,185,129,.1), transparent 70%); filter: blur(100px); animation: orbFloat 16s ease-in-out infinite; animation-delay: -6s;" />
        <div class="absolute inset-0"
          style="background-image: linear-gradient(rgba(124,58,237,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.04) 1px, transparent 1px); background-size: 50px 50px;" />
      </div>

      <div class="container relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          
          <!-- LEFT: Chat -->
          <div class="flex justify-center order-1 lg:order-none">
            <div class="relative w-full max-w-[340px] sm:max-w-[380px]">
              <div class="bg-[#16122a] border border-[rgba(124,58,237,.25)] rounded-[20px] overflow-hidden shadow-[0_0_0_1px_rgba(124,58,237,.1),0_40px_80px_rgba(0,0,0,.5),0_0_80px_rgba(124,58,237,.08)]">
                <!-- Topbar -->
                <div class="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#110d24] border-b border-[rgba(124,58,237,.15)]">
                  <div class="flex gap-1 sm:gap-1.5">
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]"></span>
                    <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]"></span>
                  </div>
                  <div class="flex-1 flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-3">
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#10b981]"></div>
                    <span class="text-xs sm:text-sm font-semibold text-[#a78bfa]">Kortex</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-[10px] sm:text-xs text-[rgba(255,255,255,.35)]">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981]" style="animation: blink 2s ease-in-out infinite;"></span>
                    En ligne
                  </div>
                </div>

                <!-- Chat body -->
                <div class="p-3 sm:p-4 sm:p-5 min-h-[240px] sm:min-h-[260px] flex flex-col gap-2 sm:gap-2.5 overflow-hidden">
                  <div
                    v-for="(msg, i) in visibleMessages"
                    :key="i"
                    class="flex items-end gap-2"
                    :class="msg.side === 'right' ? 'flex-row-reverse' : ''"
                    style="animation: msgIn .35s ease both;"
                  >
                    <div v-if="msg.side === 'left'" class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-[10px] sm:text-xs font-bold text-white flex-shrink-0">K</div>
                    <div class="max-w-[75%] sm:max-w-[78%] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed"
                      :class="msg.side === 'left' ? 'bg-[#1e1840] border border-[rgba(124,58,237,.2)] text-[rgba(255,255,255,.88)] rounded-bl-sm' : 'bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-br-sm shadow-[0_4px_16px_rgba(124,58,237,.35)]'">
                      {{ msg.text }}
                    </div>
                  </div>

                  <!-- Typing indicator -->
                  <div v-if="isTyping" class="flex items-end gap-2" style="animation: msgIn .35s ease both;">
                    <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-[10px] sm:text-xs font-bold text-white flex-shrink-0">K</div>
                    <div class="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl rounded-bl-sm bg-[#1e1840] border border-[rgba(124,58,237,.2)]">
                      <div class="flex gap-1 sm:gap-1.5">
                        <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite;"></span>
                        <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite; animation-delay: .15s;"></span>
                        <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite; animation-delay: .3s;"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Input bar -->
                <div class="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#110d24] border-t border-[rgba(124,58,237,.12)]">
                  <div class="flex-1 flex items-center gap-1.5 bg-[#1e1840] border border-[rgba(124,58,237,.18)] rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 min-h-[36px]">
                    <span class="text-[10px] sm:text-xs text-[rgba(255,255,255,.3)] flex-1 transition-opacity duration-300">{{ currentPlaceholder }}</span>
                    <span class="w-[1.5px] h-3 sm:h-3.5 bg-[#7c3aed]" style="animation: cursorBlink 1s step-end infinite;"></span>
                  </div>
                  <button class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_14px_rgba(124,58,237,.4)] hover:scale-105 transition-transform">
                    <svg width="12" height="12" sm:width="14" sm:height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Floating tags -->
              <div class="hidden sm:block absolute -top-4 -right-5 sm:-right-6 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 5s ease-in-out infinite;">
                ⚡ Automatisation
              </div>
              <div class="hidden sm:block absolute bottom-8 -left-6 sm:-left-8 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 6s ease-in-out infinite; animation-delay: -2s;">
                🤖 IA Agentique
              </div>
              <div class="hidden sm:block absolute -bottom-4 right-8 sm:right-12 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 5.5s ease-in-out infinite; animation-delay: -4s;">
                🌐 Sites web
              </div>
            </div>
          </div>

          <!-- RIGHT: Copy -->
          <div class="flex flex-col gap-4 sm:gap-5 md:gap-6 order-2 lg:order-none text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 bg-[rgba(124,58,237,.12)] border border-[rgba(124,58,237,.3)] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full w-fit mx-auto lg:mx-0">
              <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981]" style="animation: blink 2s ease-in-out infinite;"></span>
              <span class="text-[10px] sm:text-xs text-[#a78bfa] font-medium tracking-wide uppercase">Agence IA · Kortex AI</span>
            </div>

            <!-- Title -->
            <h1 class="text-[clamp(2rem, 4.5vw, 3.6rem)] font-bold leading-tight m-0">
              Votre business,<br>
              <span class="bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent bg-[length:200%_200%]"
                style="animation: gradShift 5s ease-in-out infinite;">
                augmenté par l'IA
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-sm sm:text-base text-[rgba(255,255,255,.5)] leading-relaxed max-w-md mx-auto lg:mx-0 m-0">
              Chatbots intelligents, automatisation de workflows, sites web sur mesure — on transforme votre façon de travailler, à prix accessible.
            </p>

            <!-- Stats -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8">
              <div class="flex flex-col">
                <span class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none">16+</span>
                <span class="text-[10px] sm:text-xs text-[rgba(255,255,255,.4)] mt-1 tracking-wide">Workflows déployés</span>
              </div>
              <div class="hidden sm:block w-px bg-[rgba(255,255,255,.08)]"></div>
              <div class="flex flex-col">
                <span class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none">48h</span>
                <span class="text-[10px] sm:text-xs text-[rgba(255,255,255,.4)] mt-1 tracking-wide">Délai d'intégration</span>
              </div>
              <div class="hidden sm:block w-px bg-[rgba(255,255,255,.08)]"></div>
              <div class="flex flex-col">
                <span class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-none">100%</span>
                <span class="text-[10px] sm:text-xs text-[rgba(255,255,255,.4)] mt-1 tracking-wide">Sans code requis</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button type="button" @click="scrollTo('#services')" class="btn btn-primary px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto flex items-center justify-center gap-2">
                Voir nos offres
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <button type="button" @click="scrollTo('#contact')" class="btn btn-outline px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto">
                Parler à notre IA
              </button>
            </div>

            <!-- Trust line -->
            <div class="flex items-center gap-2 justify-center lg:justify-start text-[10px] sm:text-xs text-[rgba(255,255,255,.3)]">
              <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#10b981]"></span>
              Réponse sous 24h · Sans engagement · Devis gratuit
            </div>
          </div>

        </div>
      </div>
    </header>

    <!-- Services Section -->
    <section id="services" class="py-10 sm:py-12 md:py-16">
      <div class="container px-4 sm:px-6">
        <h2 class="section-title">Nos offres</h2>
        <p class="section-subtitle">
          Choisissez la solution qui correspond à votre besoin. Toutes incluent un accompagnement personnalisé.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          <article
            v-for="offer in offers"
            :key="offer.id"
            class="relative bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-violet)] hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--glow-violet)]"
            :class="{ 'border-[var(--accent-violet)] shadow-[0_0_25px_rgba(139,92,246,0.25)]': offer.popular }"
          >
            <span v-if="offer.popular" class="absolute -top-2.5 right-4 bg-[var(--gradient)] text-white text-xs font-semibold px-2.5 py-1 rounded-full">Populaire</span>
            <h3 class="text-xl m-0 mb-2 text-[var(--text)]">{{ offer.title }}</h3>
            <p class="text-[var(--text-muted)] text-base m-0 mb-4">{{ offer.desc }}</p>
            <ul class="list-none p-0 m-0 mb-5">
              <li v-for="(f, i) in offer.features" :key="i" class="py-1.5 pl-5 relative text-sm text-[var(--text-muted)] before:content-['✓'] before:absolute before:left-0 before:text-[var(--accent-green)] before:font-bold">{{ f }}</li>
            </ul>
            <div class="flex flex-col mb-5">
              <span class="text-lg font-bold text-[var(--accent-violet)]">À partir de {{ offer.price }}</span>
              <span class="text-sm text-[var(--text-muted)]">+ {{ offer.maintenance }} de maintenance</span>
            </div>
            <button type="button" class="btn btn-secondary w-full justify-center" @click="scrollTo('#tarifs')">
              Voir les tarifs
            </button>
          </article>
        </div>

        <div class="bg-[var(--bg-card)] rounded-[var(--radius-lg)] p-5 sm:p-6 sm:px-7 border border-[var(--border-accent)]">
          <h3 class="text-lg m-0 mb-4 text-[var(--text)]">Services complémentaires</h3>
          <ul class="list-none p-0 m-0">
            <li v-for="(e, i) in extra" :key="i" class="flex justify-between items-start sm:items-center flex-wrap gap-1.5 sm:gap-2 py-2.5 sm:py-2 border-b border-[var(--border-subtle)] last:border-b-0">
              <span class="text-[var(--text-muted)] text-base">{{ e.label }}</span>
              <span class="text-[var(--accent-green)] font-medium text-sm">{{ e.price }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="tarifs" class="py-10 sm:py-12 md:py-16">
      <div class="container px-4 sm:px-6">
        <h2 class="section-title">Tarifs</h2>
        <p class="section-subtitle">
          Tableau comparatif de nos trois offres. Demandez un devis personnalisé pour votre projet.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="relative bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-7 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--glow-violet)] hover:bg-[var(--bg-card-hover)]"
            :class="{ 'border-[var(--accent-violet)] shadow-[0_0_30px_rgba(139,92,246,0.2)]': plan.popular }"
          >
            <span v-if="plan.popular" class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--gradient)] text-white text-xs font-semibold px-3 py-1 rounded-full">Recommandé</span>
            <h3 class="text-base sm:text-lg m-0 mb-3 sm:mb-4 text-[var(--text)]">{{ plan.name }}</h3>
            <div class="flex flex-col gap-1 mb-4 sm:mb-5">
              <span class="text-xl sm:text-2xl font-bold text-[var(--accent-violet)]">{{ plan.setup }}</span>
              <span class="text-xs text-[var(--text-muted)]">Mise en place</span>
              <span class="text-base font-semibold text-[var(--text)]">{{ plan.monthly }}/mois</span>
              <span class="text-xs text-[var(--text-muted)]">Maintenance</span>
            </div>
            <ul class="list-none p-0 m-0 mb-5 sm:mb-6 text-left">
              <li v-for="(f, i) in plan.features" :key="i" class="py-1.5 pl-5 text-sm text-[var(--text-muted)] relative before:content-['•'] before:absolute before:left-0 before:text-[var(--accent-green)]">{{ f }}</li>
            </ul>
            <button
              type="button"
              class="btn btn-primary w-full"
              @click="scrollTo('#contact')"
            >
              Demander un devis personnalisé
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-10 sm:py-12 md:py-16 bg-[var(--section-bg)]">
      <div class="container px-4 sm:px-6">
        <h2 class="section-title">FAQ</h2>
        <p class="section-subtitle">
          Questions fréquentes sur nos chatbots et notre accompagnement.
        </p>

        <div class="max-w-2xl mx-auto px-4">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="border border-[rgba(139,92,246,0.2)] rounded-[var(--radius)] mb-3 overflow-hidden bg-[var(--bg-card)] transition-colors duration-200"
            :class="{ 'border-[var(--accent-violet)]': openId === faq.id }"
          >
            <button type="button" class="w-full flex justify-between items-center p-4 sm:p-5 text-left bg-transparent text-[var(--text)] text-base sm:text-lg font-medium min-h-12 hover:bg-[var(--accent-violet-subtle)]" @click="toggle(faq.id)">
              <span>{{ faq.q }}</span>
              <span class="text-xl sm:text-2xl text-[var(--accent-violet)] flex-shrink-0 ml-3 sm:ml-4">{{ openId === faq.id ? '−' : '+' }}</span>
            </button>
            <div class="max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out" :class="{ 'max-h-[400px]': openId === faq.id }">
              <p class="m-0 p-4 sm:px-5 sm:pb-4 text-[var(--text-muted)] text-sm sm:text-base leading-relaxed border-t border-[var(--border-subtle)] pt-2.5 sm:pt-3">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-10 sm:py-12 md:py-16 md:py-20">
      <div class="container px-4 sm:px-6">
        <h2 class="section-title">Contact</h2>
        <p class="section-subtitle">
          Une question ? Envoyez-nous un message ou discutez avec notre IA.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start max-w-4xl mx-auto">
          <form class="bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-5 sm:p-6 min-[700px]:p-7" @submit="submit">
            <div v-if="sent" class="p-4 bg-[var(--accent-green-subtle)] rounded-[var(--radius)] text-[var(--accent-green)] font-medium">
              Message envoyé ! Nous vous recontactons rapidement.
            </div>
            <template v-else>
              <div class="mb-4 sm:mb-5">
                <label for="name" class="block mb-1.5 text-sm font-medium text-[var(--text-muted)]">Nom</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Votre nom"
                  class="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border-accent)] bg-[var(--bg)] text-[var(--text)] text-base font-inherit focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)] placeholder:text-[var(--text-muted)] placeholder:opacity-70"
                />
              </div>
              <div class="mb-4 sm:mb-5">
                <label for="email" class="block mb-1.5 text-sm font-medium text-[var(--text-muted)]">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="votre@email.com"
                  class="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border-accent)] bg-[var(--bg)] text-[var(--text)] text-base font-inherit focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)] placeholder:text-[var(--text-muted)] placeholder:opacity-70"
                />
              </div>
              <div class="mb-4 sm:mb-5">
                <label for="message" class="block mb-1.5 text-sm font-medium text-[var(--text-muted)]">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Décrivez votre projet ou votre question..."
                  class="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--border-accent)] bg-[var(--bg)] text-[var(--text)] text-base font-inherit focus:outline-none focus:border-[var(--accent-violet)] focus:shadow-[0_0_0_3px_var(--accent-violet-subtle)] placeholder:text-[var(--text-muted)] placeholder:opacity-70"
                />
              </div>
              <button type="submit" class="btn btn-primary px-5 py-3 sm:px-7 sm:py-3.5 text-base sm:text-lg font-semibold min-h-[44px] disabled:opacity-70 disabled:cursor-not-allowed" :disabled="sending">
                {{ sending ? 'Envoi...' : 'Envoyer' }}
              </button>
            </template>
          </form>

          <div class="text-[var(--text-muted)] text-base">
            <p class="m-0 mb-4">Ou contactez-nous directement :</p>
            <ul class="list-none p-0 m-0 mb-6">
              <li class="py-1"><strong class="text-[var(--text)]">Email :</strong> contact@kortex-ai.com</li>
              <li class="py-1"><strong class="text-[var(--text)]">WhatsApp :</strong> (lien à venir)</li>
            </ul>
            <p class="p-3.5 sm:p-4 bg-[var(--accent-violet-subtle)] rounded-[var(--radius)] border-l-4 border-[var(--accent-violet)] text-sm sm:text-base m-0">
              <strong class="text-[var(--text)]">Discutez avec notre IA</strong> pour une recommandation personnalisée (bientôt disponible).
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  40% { transform: translate(25px, -20px); }
  70% { transform: translate(-15px, 25px); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

@keyframes msgIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-5px); opacity: 1; }
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes floatTag {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes gradShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
