<template>
  <div class="min-h-screen overflow-x-hidden relative" style="background-color: var(--bg); color: var(--text);">

    <!-- CANVAS PARTICLES -->
    <canvas ref="canvasRef" class="fixed inset-0 z-0 pointer-events-none opacity-60" />

    <!-- GRID -->
    <div class="fixed inset-0 z-[1] pointer-events-none"
      style="background-image: linear-gradient(rgba(139,92,246,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.02) 1px, transparent 1px); background-size: 60px 60px;" />

    <!-- CURSOR -->
    <div ref="cursorRef"
      class="fixed w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-150 mix-blend-screen"
      style="background: var(--accent-violet);" />
    <div ref="ringRef"
      class="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 border transition-all duration-75"
      style="border-color: rgba(139, 92, 246, 0.4);" />

    <main class="relative z-10">

      <!-- ══ HERO ══ -->
      <section class="flex flex-col items-center text-center px-6 py-36 relative overflow-hidden">
        <!-- Orbs -->
        <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style="background: radial-gradient(circle, var(--accent-violet-subtle), transparent 70%); filter: blur(80px); animation: orbFloat 12s ease-in-out infinite;" />
        <div class="absolute top-[30%] right-[-8%] w-[380px] h-[380px] rounded-full pointer-events-none"
          style="background: radial-gradient(circle, var(--accent-green-subtle), transparent 70%); filter: blur(80px); animation: orbFloat 14s ease-in-out infinite; animation-delay: -5s;" />

        <!-- Badge -->
        <div class="reveal inline-flex items-center gap-2 border border-[var(--border-accent)] bg-[var(--accent-violet-subtle)] px-4 py-1.5 rounded-full mb-14">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" style="animation: blink 2s ease-in-out infinite;" />
          <span class="text-xs text-[var(--accent-violet)] font-medium tracking-wide uppercase">Kortex Academy — Formation IA</span>
        </div>

        <!-- Title -->
        <h1 class="reveal text-[clamp(2.5rem, 8vw, 5rem)] font-bold leading-tight mb-14" style="animation-delay: .1s;">
          Maîtrisez<br>
          <span class="bg-[var(--gradient)] bg-clip-text text-transparent">l'intelligence</span><br>
          artificielle
        </h1>

        <p class="reveal text-[var(--text-muted)] max-w-md leading-relaxed mb-16 text-base" style="animation-delay:.2s;">
          Du premier prompt à l'automatisation complète. Trois niveaux, une méthode. Zéro code requis.
        </p>

        <div class="reveal flex gap-4 flex-wrap justify-center mb-0" style="animation-delay:.3s;">
          <button type="button" @click="scrollTo('formations')" class="btn btn-primary px-8 py-3.5 text-base font-semibold">
            Découvrir les formations
          </button>
          <button type="button" @click="scrollTo('dashboard')" class="btn btn-outline px-8 py-3.5 text-base font-semibold">
            Voir le dashboard
          </button>
        </div>
      </section>

      <!-- ══ STATS ══ -->
      <div class="border-y border-[var(--border-subtle)] py-12 px-6 bg-[var(--section-bg)]">
        <div class="container max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
          <div v-for="s in stats" :key="s.label">
            <div class="text-5xl font-bold mb-2" style="color: var(--accent-violet);">{{ s.num }}</div>
            <div class="text-sm text-[var(--text-muted)]">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <!-- ══ FORMATIONS ══ -->
      <section id="formations" class="py-16 md:py-20">
        <div class="container">
          <h2 class="section-title">Trois niveaux, une trajectoire</h2>
          <p class="section-subtitle">
            Choisissez votre niveau et progressez à votre rythme. Pas de prérequis technique.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <article
              v-for="(n, i) in niveaux"
              :key="n.id"
              class="relative bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-6 sm:p-8 transition-all duration-500 group overflow-hidden"
              :class="{ 'border-[var(--accent-violet)] shadow-[var(--glow-violet)]': n.popular }"
              @mousemove="tilt($event, i)"
              @mouseleave="untilt(i)"
              :ref="el => cardRefs[i] = el"
            >
              <!-- Popular badge -->
              <span v-if="n.popular" class="absolute -top-2.5 right-4 bg-[var(--gradient)] text-white text-xs font-semibold px-2.5 py-1 rounded-full">Populaire</span>

              <!-- Top glow line -->
              <div class="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :style="`background: linear-gradient(90deg, transparent, var(--accent-violet), transparent)`" />

              <!-- Ambient glow -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style="background: radial-gradient(circle at 50% 0%, var(--accent-violet-subtle), transparent 60%);" />

              <!-- Tag -->
              <div class="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 border border-[var(--border-accent)] bg-[var(--accent-violet-subtle)] text-[var(--accent-violet)]">
                {{ n.tag }}
              </div>

              <h3 class="text-2xl font-bold m-0 mb-3 text-[var(--text)]" v-html="n.title" />
              <p class="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{{ n.sub }}</p>

              <!-- Durée -->
              <div class="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-6">
                <span>⏱</span> {{ n.duree }}
              </div>

              <!-- Features -->
              <ul class="list-none p-0 m-0 mb-6 space-y-2">
                <li v-for="f in n.features" :key="f" class="flex items-start gap-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                  <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-[var(--accent-violet)]" />
                  {{ f }}
                </li>
              </ul>

              <!-- Livrable -->
              <div class="rounded-[var(--radius)] p-4 mb-6 text-sm leading-relaxed border border-[var(--border-accent)] bg-[var(--accent-violet-subtle)]">
                <span class="block text-xs font-semibold mb-1.5 text-[var(--accent-violet)] uppercase tracking-wide">Livrable final</span>
                {{ n.livrable }}
              </div>

              <!-- CTA -->
              <button type="button" class="btn btn-secondary w-full">
                Commencer le niveau {{ n.id }}
              </button>
            </article>
          </div>
        </div>
      </section>

      <!-- ══ DASHBOARD ══ -->
      <section id="dashboard" class="py-16 md:py-20 bg-[var(--section-bg)]">
        <div class="container">
          <h2 class="section-title">Votre dashboard personnel</h2>
          <p class="section-subtitle">
            Suivez votre progression et accédez à vos formations.
          </p>

          <!-- Dashboard window -->
          <div class="border border-[var(--border-accent)] rounded-[var(--radius-lg)] overflow-hidden bg-[var(--bg-card)] reveal">

            <!-- Topbar -->
            <div class="flex items-center gap-3 px-5 py-3.5 bg-[var(--bg)] border-b border-[var(--border-subtle)]">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div class="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div class="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md px-3 py-1 text-center text-xs text-[var(--text-muted)]">
                app.kortex-ai.com/formation
              </div>
            </div>

            <div class="flex flex-col md:flex-row min-h-[480px]">

              <!-- Sidebar -->
              <div class="hidden md:flex flex-col w-52 border-r border-[var(--border-subtle)] p-5 gap-1 flex-shrink-0">
                <div class="flex items-center gap-2 mb-5 text-xl font-bold">
                  <div class="w-2 h-2 rounded-full bg-[var(--gradient)]" />
                  Kortex
                </div>
                <div v-for="nav in navItems" :key="nav.label"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-default"
                  :class="nav.active ? 'bg-[var(--accent-violet-subtle)] text-[var(--accent-violet)]' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card-hover)]'">
                  <span class="text-xs opacity-60">{{ nav.icon }}</span>
                  {{ nav.label }}
                </div>
              </div>

              <!-- Main -->
              <div class="flex-1 p-6 md:p-8">
                <div class="mb-1 text-2xl font-bold">
                  Bonjour, <span class="text-[var(--accent-violet)]">{{ userName }}</span>
                </div>
                <div class="text-sm text-[var(--text-muted)] mb-7">Continuez votre progression — 3 niveaux disponibles</div>

                <!-- Offer cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-7">
                  <div v-for="(offer, i) in offers" :key="offer.id"
                    class="border rounded-[var(--radius-lg)] p-5 transition-all duration-300 cursor-default relative overflow-hidden group bg-[var(--bg-card)]"
                    :class="[
                      selectedOffer === i ? 'border-[var(--accent-violet)] shadow-[var(--glow-violet)]' : 'border-[var(--border-accent)]',
                      'hover:-translate-y-0.5'
                    ]"
                    @click="selectedOffer = i">

                    <!-- Badge -->
                    <span v-if="offer.badge"
                      class="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium bg-[var(--accent-violet-subtle)] text-[var(--accent-violet)]">
                      {{ offer.badge }}
                    </span>

                    <div class="text-4xl font-bold opacity-15 mb-3 group-hover:opacity-30 transition-opacity text-[var(--accent-violet)]">
                      {{ String(offer.id).padStart(2,'0') }}
                    </div>
                    <div class="text-base font-semibold mb-1 text-[var(--text)]">{{ offer.name }}</div>
                    <div class="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{{ offer.desc }}</div>

                    <!-- Progress -->
                    <div class="h-1 bg-[var(--bg)] rounded-full mb-1.5 overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-1000 bg-[var(--accent-violet)]"
                        :style="`width:${offer.progress}%`" />
                    </div>
                    <div class="text-xs text-[var(--text-muted)]">{{ offer.progressLabel }}</div>
                  </div>
                </div>

                <!-- Modules -->
                <div class="text-xs text-[var(--text-muted)] uppercase mb-3 font-semibold tracking-wide">
                  Modules en cours — Niveau 01
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div v-for="mod in modules" :key="mod.name"
                    class="border border-[var(--border-accent)] rounded-[var(--radius-lg)] p-3.5 bg-[var(--bg-card)]">
                    <span class="block text-base mb-2 opacity-50">{{ mod.icon }}</span>
                    <span class="block text-sm text-[var(--text)] mb-1 font-medium">{{ mod.name }}</span>
                    <span class="text-xs" :style="`color:${mod.done ? 'var(--accent-violet)' : 'var(--text-muted)'}`">{{ mod.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ PROCESS ══ -->
      <section class="py-16 md:py-20">
        <div class="container">
          <h2 class="section-title">Trois étapes vers l'autonomie</h2>
          <p class="section-subtitle">
            Un parcours simple et progressif pour maîtriser l'IA.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative reveal">
            <!-- Line connector -->
            <div class="hidden md:block absolute top-6 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px opacity-30"
              style="background: var(--gradient);" />

            <div v-for="step in steps" :key="step.num" class="group text-center">
              <div class="w-12 h-12 rounded-full border border-[var(--border-accent)] flex items-center justify-center mx-auto mb-6 text-base font-bold text-[var(--accent-violet)] bg-[var(--bg-card)] transition-all duration-300 group-hover:border-[var(--accent-violet)] group-hover:shadow-[var(--glow-violet)]">
                {{ step.num }}
              </div>
              <div class="text-xl font-bold mb-2 text-[var(--text)]">{{ step.title }}</div>
              <p class="text-sm text-[var(--text-muted)] leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ FOOTER CTA ══ -->
      <section class="py-16 md:py-20 text-center relative overflow-hidden bg-[var(--section-bg)]">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-[600px] h-[600px] rounded-full opacity-20"
            style="background: radial-gradient(circle, var(--accent-violet-subtle), transparent 70%); filter: blur(60px);" />
        </div>
        <div class="container relative reveal">
          <h2 class="section-title mb-5">
            Prêt à maîtriser<br>
            <span class="bg-[var(--gradient)] bg-clip-text text-transparent">l'IA</span> ?
          </h2>
          <p class="section-subtitle max-w-md mx-auto mb-10">
            Rejoignez Kortex Academy — sans coder, sans jargon, avec des résultats dès la première session.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button type="button" @click="scrollTo('formations')" class="btn btn-primary px-8 py-3.5 text-base font-semibold">
              Commencer maintenant
            </button>
            <button type="button" @click="scrollTo('dashboard')" class="btn btn-outline px-8 py-3.5 text-base font-semibold">
              Voir le dashboard
            </button>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()

// ── Data ──────────────────────────────────────────────
const userName = ref('')
const selectedOffer = ref(0)
const cardRefs = ref([])

// Récupérer le nom de l'utilisateur connecté
const user = auth.user?.value ?? auth.user
if (user) {
  userName.value = user.user_metadata?.first_name || user.email?.split('@')[0] || 'Apprenant'
} else {
  userName.value = 'Apprenant'
}

const stats = [
  { num: '3', label: 'Niveaux progressifs' },
  { num: '50h', label: 'De contenu total' },
  { num: '0', label: 'Prérequis technique' },
  { num: '100%', label: 'Pratique opérationnelle' },
]

const niveaux = [
  {
    id: 1, tag: 'Débutant', popular: false,
    title: 'Comprendre<br>& oser utiliser',
    sub: 'Lever les peurs, maîtriser les bases et faire vos premiers pas concrets dès la première session.',
    duree: '6 à 10 heures · 4 sessions',
    features: [
      "Comprendre ce qu'est l'IA générative et ses limites",
      'Formuler une demande structurée : contexte, objectif, format',
      'Identifier 5+ cas d\'usage dans votre métier',
      'Évaluer et corriger les réponses avec esprit critique',
      'Appliquer les règles RGPD et confidentialité',
    ],
    livrable: 'Kit de démarrage : 10 prompts testés + guide d\'usage personnel ou équipe',
  },
  {
    id: 2, tag: 'Intermédiaire', popular: true,
    title: 'Maîtriser<br>& adapter',
    sub: 'Passez de l\'usage intuitif à une pratique méthodique. Templates, frameworks, adaptation sectorielle.',
    duree: '10 à 15 heures · 6 sessions',
    features: [
      'Prompt engineering avancé : CoT, Few-shot, COSTAR, CRISPE',
      'Construire une bibliothèque de templates réutilisables',
      'Adapter l\'IA à votre secteur : RH, marketing, commerce',
      'Travailler sur vos documents réels : synthèses, FAQ',
      'Documenter et partager les bonnes pratiques en équipe',
    ],
    livrable: 'Playbook IA métier : 15 prompts + 3 scénarios complets. Productivité +30% mesurée.',
  },
  {
    id: 3, tag: 'Avancé', popular: false,
    title: 'Créer<br>& automatiser',
    sub: 'Concevez vos propres outils IA, automatisez des processus entiers, déployez à l\'échelle.',
    duree: '15 à 25 heures · 8 sessions',
    features: [
      'Créer des Custom GPTs et Claude Projects sur mesure',
      'Mega-prompts 500+ mots pour tâches complexes',
      'Workflows no-code : Zapier, Make, n8n — sans coder',
      'Connecter l\'IA à vos outils : CRM, email, Notion',
      'Gouvernance, sécurité, ROI et conduite du changement',
    ],
    livrable: 'Système IA déployé + documentation + ROI mesuré (ex. 12h/mois économisées)',
  },
]

const navItems = [
  { label: 'Vue d\'ensemble', icon: '⬡', active: true },
  { label: 'Mes formations', icon: '◎', active: false },
  { label: 'Bibliothèque', icon: '◈', active: false },
  { label: 'Livrables', icon: '◻', active: false },
  { label: 'Profil', icon: '◯', active: false },
]

const offers = [
  { id: 1, name: 'Débutant', badge: 'En cours', progress: 40, progressLabel: '40% · Session 3/6', desc: 'Comprendre & oser utiliser l\'IA dans votre quotidien' },
  { id: 2, name: 'Intermédiaire', badge: 'Débloqué', progress: 0, progressLabel: 'Disponible après N1', desc: 'Prompt engineering avancé et adaptation métier' },
  { id: 3, name: 'Avancé', badge: null, progress: 0, progressLabel: 'Disponible après N2', desc: 'Créer vos outils IA et automatiser vos processus' },
]

const modules = [
  { name: 'Comprendre l\'IA', icon: '◎', done: true, status: 'Terminé' },
  { name: 'Bases du dialogue', icon: '◈', done: true, status: 'En cours' },
  { name: 'Cas d\'usage', icon: '◻', done: false, status: 'À venir' },
  { name: 'Éthique & limites', icon: '◯', done: false, status: 'À venir' },
]

const steps = [
  { num: '01', title: 'Choisissez votre niveau', desc: 'Débutant, intermédiaire ou avancé. Pas de prérequis. On s\'adapte à votre point de départ réel.' },
  { num: '02', title: 'Apprenez en pratiquant', desc: 'Sessions courtes, exercices sur vos cas réels, livrables directement utilisables dans votre activité.' },
  { num: '03', title: 'Déployez & mesurez', desc: 'Chaque niveau se valide par un livrable concret. ROI mesuré. Autonomie prouvée.' },
]

// ── Scroll helper ─────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Cursor ────────────────────────────────────────────
const cursorRef = ref(null)
const ringRef = ref(null)
let mx = 0, my = 0, rx = 0, ry = 0, rafId = null

function onMouseMove(e) {
  mx = e.clientX; my = e.clientY
  if (cursorRef.value) {
    cursorRef.value.style.left = mx + 'px'
    cursorRef.value.style.top = my + 'px'
  }
}

function animRing() {
  rx += (mx - rx) * .12
  ry += (my - ry) * .12
  if (ringRef.value) {
    ringRef.value.style.left = rx + 'px'
    ringRef.value.style.top = ry + 'px'
  }
  rafId = requestAnimationFrame(animRing)
}

// ── Card tilt ─────────────────────────────────────────
function tilt(e, i) {
  const card = cardRefs.value[i]
  if (!card) return
  const rect = card.getBoundingClientRect()
  const cx = (e.clientX - rect.left) / rect.width - .5
  const cy = (e.clientY - rect.top) / rect.height - .5
  card.style.transform = `perspective(1000px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg) translateY(-4px)`
}

function untilt(i) {
  const card = cardRefs.value[i]
  if (card) card.style.transform = ''
}

// ── Particle canvas ───────────────────────────────────
const canvasRef = ref(null)
let particles = [], canvasRaf = null

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let W, H

  function resize() {
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  class P {
    constructor() { this.reset(W, H) }
    reset(W, H) {
      this.x = Math.random() * W
      this.y = Math.random() * H
      this.vx = (Math.random() - .5) * .4
      this.vy = (Math.random() - .5) * .4
      this.r = Math.random() * 1.4 + .3
      this.alpha = Math.random() * .45 + .1
      this.life = Math.random() * 200 + 100
      this.age = 0
      const t = Math.random()
      this.color = t < .5 ? [139,92,246] : t < .8 ? [34,197,94] : [59,130,246]
    }
    update(W, H) {
      this.x += this.vx; this.y += this.vy; this.age++
      if (this.age > this.life || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(W, H)
      const fade = Math.min(this.age / 20, (this.life - this.age) / 20)
      this.ca = this.alpha * Math.min(1, fade)
    }
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.color},${this.ca})`
      ctx.fill()
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new P())

  function frame() {
    ctx.clearRect(0, 0, W, H)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < 110) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(139,92,246,${(1-d/110)*.07})`
          ctx.lineWidth = .5
          ctx.stroke()
        }
      }
    }
    particles.forEach(p => { p.update(W, H); p.draw(ctx) })
    canvasRaf = requestAnimationFrame(frame)
  }
  frame()
}

// ── Scroll reveal ─────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal')
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('opacity-100', 'translate-y-0')
    })
  }, { threshold: .1 })
  els.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700')
    obs.observe(el)
  })
}

// ── Lifecycle ─────────────────────────────────────────
onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  animRing()
  initCanvas()
  initReveal()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
  if (canvasRaf) cancelAnimationFrame(canvasRaf)
})
</script>

<style scoped>
@keyframes orbFloat {
  0%, 100% { transform: translate(0,0) scale(1); }
  33%       { transform: translate(20px,-15px) scale(1.04); }
  66%       { transform: translate(-15px,20px) scale(.96); }
}
@keyframes blink {
  0%, 100% { opacity:1; }
  50%       { opacity:.25; }
}

:deep(*) { cursor: none !important; }
</style>
