<script setup>
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
</script>

<template>
  <section id="services" class="services">
    <div class="container">
      <h2 class="section-title">Nos offres</h2>
      <p class="section-subtitle">
        Choisissez la solution qui correspond à votre besoin. Toutes incluent un accompagnement personnalisé.
      </p>

      <div class="offers-grid">
        <article
          v-for="offer in offers"
          :key="offer.id"
          class="offer-card"
          :class="{ popular: offer.popular }"
        >
          <span v-if="offer.popular" class="badge">Populaire</span>
          <h3 class="offer-title">{{ offer.title }}</h3>
          <p class="offer-desc">{{ offer.desc }}</p>
          <ul class="offer-features">
            <li v-for="(f, i) in offer.features" :key="i">{{ f }}</li>
          </ul>
          <div class="offer-price">
            <span class="amount">À partir de {{ offer.price }}</span>
            <span class="maintenance">+ {{ offer.maintenance }} de maintenance</span>
          </div>
          <button type="button" class="btn btn-secondary btn-block" @click="document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' })">
            Voir les tarifs
          </button>
        </article>
      </div>

      <div class="extra-services">
        <h3 class="extra-title">Services complémentaires</h3>
        <ul class="extra-list">
          <li v-for="(e, i) in extra" :key="i">
            <span class="extra-label">{{ e.label }}</span>
            <span class="extra-price">{{ e.price }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: 2.5rem 0;
}
@media (min-width: 480px) {
  .services {
    padding: 3rem 0;
  }
}
@media (min-width: 768px) {
  .services {
    padding: 4rem 0;
  }
}

.offers-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}
@media (min-width: 480px) {
  .offers-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }
}
@media (min-width: 768px) {
  .offers-grid {
    margin-bottom: 3rem;
  }
}

.offer-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
@media (min-width: 480px) {
  .offer-card {
    padding: 1.75rem;
  }
}
.offer-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-violet);
  background: var(--bg-card-hover);
  box-shadow: var(--glow-violet);
}
.offer-card.popular {
  border-color: var(--accent-violet);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.25);
}

.badge {
  position: absolute;
  top: -10px;
  right: 1rem;
  background: var(--gradient);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
}

.offer-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: var(--text);
}
.offer-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0 0 1rem;
}
.offer-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
}
.offer-features li {
  padding: 0.35rem 0;
  padding-left: 1.25rem;
  position: relative;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.offer-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent-green);
  font-weight: 700;
}
.offer-price {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}
.offer-price .amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-violet);
}
.offer-price .maintenance {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.btn-block {
  width: 100%;
  justify-content: center;
}

.extra-services {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1rem;
  border: 1px solid var(--border-accent);
}
@media (min-width: 480px) {
  .extra-services {
    padding: 1.5rem 1.75rem;
  }
}
.extra-title {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  color: var(--text);
}
.extra-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.extra-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border-subtle);
}
@media (min-width: 480px) {
  .extra-list li {
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }
}
.extra-list li:last-child {
  border-bottom: none;
}
.extra-label {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.extra-price {
  color: var(--accent-green);
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
