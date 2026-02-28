<script setup>
const plans = [
  { name: 'Chatbot IA Site Web', setup: '500€', monthly: '99€', features: ['Widget personnalisable', 'Dashboard', 'Multi-langue'] },
  { name: 'Chatbot Agent IA', setup: '1 000€', monthly: '149€', popular: true, features: ['Tout Offre 1', 'RDV auto', 'Catalogue', 'Notifications'] },
  { name: 'Chatbot WhatsApp', setup: '800€', monthly: '129€', features: ['Réponses WhatsApp', 'Catalogue', 'RDV & devis'] }
]
</script>

<template>
  <section id="tarifs" class="pricing">
    <div class="container">
      <h2 class="section-title">Tarifs</h2>
      <p class="section-subtitle">
        Tableau comparatif de nos trois offres. Demandez un devis personnalisé pour votre projet.
      </p>

      <div class="pricing-grid">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="pricing-card"
          :class="{ popular: plan.popular }"
        >
          <span v-if="plan.popular" class="badge">Recommandé</span>
          <h3 class="plan-name">{{ plan.name }}</h3>
          <div class="plan-price">
            <span class="setup">{{ plan.setup }}</span>
            <span class="setup-label">Mise en place</span>
            <span class="monthly">{{ plan.monthly }}/mois</span>
            <span class="monthly-label">Maintenance</span>
          </div>
          <ul class="plan-features">
            <li v-for="(f, i) in plan.features" :key="i">{{ f }}</li>
          </ul>
          <button
            type="button"
            class="btn btn-primary btn-block"
            @click="document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })"
          >
            Demander un devis personnalisé
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  padding: 4rem 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.pricing-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.pricing-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-violet);
  background: var(--bg-card-hover);
}
.pricing-card.popular {
  border-color: var(--accent-violet);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
}

.pricing-card .badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.plan-name {
  font-size: 1.15rem;
  margin: 0 0 1rem;
  color: var(--text);
}
.plan-price {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}
.setup {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-violet);
}
.setup-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.monthly {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}
.monthly-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  text-align: left;
}
.plan-features li {
  padding: 0.3rem 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  padding-left: 1.2rem;
  position: relative;
}
.plan-features li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-green);
}
</style>
