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

</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Header / Hero Section -->
    <header id="accueil" class="relative overflow-hidden min-h-screen flex items-center py-8 sm:py-12 md:py-16 lg:py-20">
      <!-- Background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px] rounded-full top-[-15%] sm:top-[-20%] left-[-15%] sm:left-[-12%]"
          style="background: radial-gradient(circle, rgba(124,58,237,.18), transparent 70%); filter: blur(100px); animation: orbFloat 14s ease-in-out infinite;" />
        <div class="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[420px] lg:h-[420px] rounded-full bottom-[-8%] sm:bottom-[-5%] right-[5%] sm:right-[3%]"
          style="background: radial-gradient(circle, rgba(16,185,129,.1), transparent 70%); filter: blur(100px); animation: orbFloat 16s ease-in-out infinite; animation-delay: -6s;" />
        <div class="absolute inset-0 bg-grid-pattern" />
      </div>

      <div class="container relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          <!-- LEFT: Chat -->
          <div class="flex justify-center order-1 lg:order-none">
            <div class="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px]">
              <div class="bg-[#16122a] border border-[rgba(124,58,237,.25)] rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_0_0_1px_rgba(124,58,237,.1),0_40px_80px_rgba(0,0,0,.5),0_0_80px_rgba(124,58,237,.08)]">
                <!-- Topbar -->
                <div class="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-[#110d24] border-b border-[rgba(124,58,237,.15)]">
                  <div class="flex gap-1 sm:gap-1.5">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f57]"></span>
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#febc2e]"></span>
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28c840]"></span>
                  </div>
                  <div class="flex-1 flex items-center gap-1 sm:gap-1.5 md:gap-2 ml-1.5 sm:ml-2 md:ml-3">
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#10b981]"></div>
                    <span class="text-[10px] sm:text-xs md:text-sm font-semibold text-[#a78bfa]">Kortex</span>
                  </div>
                  <div class="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.35)]">
                    <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[#10b981]" style="animation: blink 2s ease-in-out infinite;"></span>
                    <span class="hidden sm:inline">En ligne</span>
                  </div>
                </div>

                <!-- Chat body -->
                <div class="p-2.5 sm:p-3 md:p-4 lg:p-5 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 overflow-hidden">
                  <div
                    v-for="(msg, i) in visibleMessages"
                    :key="i"
                    class="flex items-end gap-1.5 sm:gap-2"
                    :class="msg.side === 'right' ? 'flex-row-reverse' : ''"
                    style="animation: msgIn .35s ease both;"
                  >
                    <div v-if="msg.side === 'left'" class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-bold text-white flex-shrink-0">K</div>
                    <div class="max-w-[75%] sm:max-w-[78%] px-2.5 sm:px-3 md:px-3.5 py-1.5 sm:py-2 md:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm leading-relaxed"
                      :class="msg.side === 'left' ? 'bg-[#1e1840] border border-[rgba(124,58,237,.2)] text-[rgba(255,255,255,.88)] rounded-bl-sm' : 'bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-br-sm shadow-[0_4px_16px_rgba(124,58,237,.35)]'">
                      {{ msg.text }}
                    </div>
                  </div>

                  <!-- Typing indicator -->
                  <div v-if="isTyping" class="flex items-end gap-1.5 sm:gap-2" style="animation: msgIn .35s ease both;">
                    <div class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-bold text-white flex-shrink-0">K</div>
                    <div class="px-2.5 sm:px-3 md:px-3.5 py-1.5 sm:py-2 md:py-2.5 rounded-xl sm:rounded-2xl rounded-bl-sm bg-[#1e1840] border border-[rgba(124,58,237,.2)]">
                      <div class="flex gap-1 sm:gap-1.5">
                        <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite;"></span>
                        <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite; animation-delay: .15s;"></span>
                        <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[rgba(255,255,255,.4)]" style="animation: typingBounce 1.2s ease-in-out infinite; animation-delay: .3s;"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Input bar -->
                <div class="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-[#110d24] border-t border-[rgba(124,58,237,.12)]">
                  <div class="flex-1 flex items-center gap-1 sm:gap-1.5 bg-[#1e1840] border border-[rgba(124,58,237,.18)] rounded-lg sm:rounded-xl px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 min-h-[32px] sm:min-h-[36px]">
                    <span class="text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.3)] flex-1 transition-opacity duration-300 truncate">{{ currentPlaceholder }}</span>
                    <span class="w-[1.5px] h-2.5 sm:h-3 md:h-3.5 bg-[#7c3aed] flex-shrink-0" style="animation: cursorBlink 1s step-end infinite;"></span>
                  </div>
                  <button class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_14px_rgba(124,58,237,.4)] hover:scale-105 active:scale-95 transition-transform">
                    <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Floating tags -->
              <div class="hidden md:block absolute -top-3 sm:-top-4 -right-4 sm:-right-5 md:-right-6 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 5s ease-in-out infinite;">
                ⚡ Automatisation
              </div>
              <div class="hidden md:block absolute bottom-6 sm:bottom-8 -left-5 sm:-left-6 md:-left-8 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 6s ease-in-out infinite; animation-delay: -2s;">
                🤖 IA Agentique
              </div>
              <div class="hidden md:block absolute -bottom-3 sm:-bottom-4 right-6 sm:right-8 md:right-12 bg-[rgba(22,18,42,.9)] border border-[rgba(124,58,237,.25)] rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.7)] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-sm"
                style="animation: floatTag 5.5s ease-in-out infinite; animation-delay: -4s;">
                🌐 Sites web
              </div>
            </div>
          </div>

          <!-- RIGHT: Copy -->
          <div class="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 order-2 lg:order-none text-center lg:text-left px-2 sm:px-0">
            <!-- Badge -->
            <div class="inline-flex items-center gap-1.5 sm:gap-2 bg-[rgba(124,58,237,.12)] border border-[rgba(124,58,237,.3)] px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full w-fit mx-auto lg:mx-0">
              <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[#10b981]" style="animation: blink 2s ease-in-out infinite;"></span>
              <span class="text-[9px] sm:text-[10px] md:text-xs text-[#a78bfa] font-medium tracking-wide uppercase">Agence IA · Kortex AI</span>
            </div>

            <!-- Title -->
            <h1 class="text-[clamp(1.75rem, 4.5vw, 3.6rem)] font-bold leading-[1.1] m-0">
              Votre business,<br>
              <span class="bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent bg-[length:200%_200%]"
                style="animation: gradShift 5s ease-in-out infinite;">
                augmenté par l'IA
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="text-xs sm:text-sm md:text-base text-[rgba(255,255,255,.5)] leading-relaxed max-w-md mx-auto lg:mx-0 m-0">
              Chatbots intelligents, automatisation de workflows, sites web sur mesure — on transforme votre façon de travailler, à prix accessible.
            </p>

            <!-- Stats -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              <div class="flex flex-col">
                <span class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-none">16+</span>
                <span class="text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.4)] mt-0.5 sm:mt-1 tracking-wide">Workflows déployés</span>
              </div>
              <div class="hidden sm:block w-px bg-[rgba(255,255,255,.08)] self-stretch"></div>
              <div class="flex flex-col">
                <span class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-none">48h</span>
                <span class="text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.4)] mt-0.5 sm:mt-1 tracking-wide">Délai d'intégration</span>
              </div>
              <div class="hidden sm:block w-px bg-[rgba(255,255,255,.08)] self-stretch"></div>
              <div class="flex flex-col">
                <span class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-none">100%</span>
                <span class="text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.4)] mt-0.5 sm:mt-1 tracking-wide">Sans code requis</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center lg:justify-start">
              <button type="button" @click="scrollTo('#services')" class="btn btn-primary px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-semibold w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px]">
                Voir nos offres
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <button type="button" @click="scrollTo('#contact')" class="btn btn-outline px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-semibold w-full sm:w-auto min-h-[44px]">
                Parler à notre IA
              </button>
            </div>

            <!-- Trust line -->
            <div class="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start text-[9px] sm:text-[10px] md:text-xs text-[rgba(255,255,255,.3)] flex-wrap">
              <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#10b981] flex-shrink-0"></span>
              <span>Réponse sous 24h · Sans engagement · Devis gratuit</span>
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

    <!-- CTA Section Innovante -->
    <section id="contact" class="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <!-- Background avec effet glassmorphism -->
      <div class="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,.08)] via-[rgba(16,185,129,.05)] to-[rgba(124,58,237,.08)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,.1),transparent_70%)]"></div>
      
      <!-- Grille animée -->
      <div class="absolute inset-0 opacity-30"
        style="background-image: linear-gradient(rgba(124,58,237,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.1) 1px, transparent 1px); background-size: 60px 60px; animation: gridMove 20s linear infinite;"></div>

      <div class="container relative z-10 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-[rgba(124,58,237,.15)] border border-[rgba(124,58,237,.3)] px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span class="text-xs text-[#a78bfa] font-medium tracking-wide uppercase">Prêt à démarrer ?</span>
          </div>

          <!-- Titre -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[var(--text)]">
            Transformez votre business
            <span class="block bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#10b981] bg-clip-text text-transparent bg-[length:200%_200%]"
              style="animation: gradShift 5s ease-in-out infinite;">
              avec l'IA dès aujourd'hui
            </span>
          </h2>

          <!-- Sous-titre -->
          <p class="text-base sm:text-lg md:text-xl text-[var(--text-muted)] mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Rejoignez les entreprises qui automatisent leurs processus et augmentent leur productivité. 
            <span class="text-[var(--accent-violet)] font-medium">Démarrage en 48h.</span>
          </p>

          <!-- CTA Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <!-- Card 1 -->
            <div class="group relative bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-6 sm:p-7 hover:border-[var(--accent-violet)] hover:shadow-[0_0_30px_rgba(124,58,237,.3)] transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,.05)] to-transparent rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-[var(--text)] mb-2">Chatbot IA</h3>
                <p class="text-sm sm:text-base text-[var(--text-muted)] mb-4">À partir de 500€</p>
                <button @click="scrollTo('#services')" class="btn btn-secondary w-full text-sm sm:text-base">
                  Découvrir
                </button>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="group relative bg-[var(--bg-card)] border-2 border-[var(--accent-violet)] rounded-[var(--radius-lg)] p-6 sm:p-7 hover:shadow-[0_0_40px_rgba(124,58,237,.4)] transition-all duration-300 hover:-translate-y-1">
              <div class="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,.1)] to-transparent rounded-[var(--radius-lg)]"></div>
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7c3aed] to-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-full">
                Populaire
              </div>
              <div class="relative z-10">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#10b981] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-[var(--text)] mb-2">Agent IA</h3>
                <p class="text-sm sm:text-base text-[var(--text-muted)] mb-4">À partir de 1 000€</p>
                <button @click="scrollTo('#services')" class="btn btn-primary w-full text-sm sm:text-base">
                  Choisir
                </button>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="group relative bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-6 sm:p-7 hover:border-[var(--accent-violet)] hover:shadow-[0_0_30px_rgba(124,58,237,.3)] transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div class="absolute inset-0 bg-gradient-to-br from-[rgba(16,185,129,.05)] to-transparent rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-[var(--text)] mb-2">WhatsApp</h3>
                <p class="text-sm sm:text-base text-[var(--text-muted)] mb-4">À partir de 800€</p>
                <button @click="scrollTo('#services')" class="btn btn-secondary w-full text-sm sm:text-base">
                  Découvrir
                </button>
              </div>
            </div>
          </div>

          <!-- Trust badges -->
          <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 text-sm sm:text-base text-[var(--text-muted)]">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Démarrage en 48h</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Sans code requis</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Support dédié</span>
            </div>
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

.bg-grid-pattern {
  background-image: linear-gradient(rgba(124,58,237,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

@media (min-width: 640px) {
  .bg-grid-pattern {
    background-size: 50px 50px;
  }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}
</style>
