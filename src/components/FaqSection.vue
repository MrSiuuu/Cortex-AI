<script setup>
import { ref } from 'vue'

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
  <section class="faq">
    <div class="container">
      <h2 class="section-title">FAQ</h2>
      <p class="section-subtitle">
        Questions fréquentes sur nos chatbots et notre accompagnement.
      </p>

      <div class="faq-list">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="faq-item"
          :class="{ open: openId === faq.id }"
        >
          <button type="button" class="faq-question" @click="toggle(faq.id)">
            <span>{{ faq.q }}</span>
            <span class="faq-icon">{{ openId === faq.id ? '−' : '+' }}</span>
          </button>
          <div class="faq-answer">
            <p>{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: 2.5rem 0;
  background: var(--section-bg);
}
@media (min-width: 480px) {
  .faq {
    padding: 3rem 0;
  }
}
@media (min-width: 768px) {
  .faq {
    padding: 4rem 0;
  }
}

.faq-list {
  max-width: 640px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius);
  margin-bottom: 0.75rem;
  overflow: hidden;
  background: var(--bg-card);
  transition: border-color 0.2s;
}
.faq-item.open {
  border-color: var(--accent-violet);
}
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1rem;
  text-align: left;
  background: none;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 500;
  min-height: 48px;
}
@media (min-width: 480px) {
  .faq-question {
    padding: 1rem 1.25rem;
    font-size: 1rem;
  }
}
.faq-question:hover {
  background: var(--accent-violet-subtle);
}
.faq-icon {
  font-size: 1.2rem;
  color: var(--accent-violet);
  flex-shrink: 0;
  margin-left: 0.75rem;
}
@media (min-width: 480px) {
  .faq-icon {
    font-size: 1.25rem;
    margin-left: 1rem;
  }
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.faq-item.open .faq-answer {
  max-height: 400px;
}
.faq-answer p {
  margin: 0;
  padding: 0 1rem 0.9rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.65rem;
  margin-top: 0;
}
@media (min-width: 480px) {
  .faq-answer p {
    padding: 0 1.25rem 1rem;
    padding-top: 0.75rem;
    font-size: 0.95rem;
  }
}
</style>
