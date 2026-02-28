<script setup>
import { ref } from 'vue'

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
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <p class="section-subtitle">
        Une question ? Envoyez-nous un message ou discutez avec notre IA.
      </p>

      <div class="contact-grid">
        <form class="contact-form" @submit="submit">
          <div v-if="sent" class="form-success">
            Message envoyé ! Nous vous recontactons rapidement.
          </div>
          <template v-else>
            <div class="form-group">
              <label for="name">Nom</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Votre nom"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="votre@email.com"
              />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="4"
                placeholder="Décrivez votre projet ou votre question..."
              />
            </div>
            <button type="submit" class="btn btn-primary btn-lg" :disabled="sending">
              {{ sending ? 'Envoi...' : 'Envoyer' }}
            </button>
          </template>
        </form>

        <div class="contact-info">
          <p>Ou contactez-nous directement :</p>
          <ul>
            <li><strong>Email :</strong> contact@kortex-ai.com</li>
            <li><strong>WhatsApp :</strong> (lien à venir)</li>
          </ul>
          <p class="contact-cta">
            <strong>Discutez avec notre IA</strong> pour une recommandation personnalisée (bientôt disponible).
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 4rem 0 5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 700px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-form {
  background: var(--bg-card);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-accent);
  background: var(--bg);
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
}
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-violet);
  box-shadow: 0 0 0 3px var(--accent-violet-subtle);
}
.form-success {
  padding: 1rem;
  background: var(--accent-green-subtle);
  border-radius: var(--radius);
  color: var(--accent-green);
  font-weight: 500;
}
button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-info {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.contact-info p {
  margin: 0 0 1rem;
}
.contact-info ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}
.contact-info li {
  padding: 0.25rem 0;
}
.contact-info strong {
  color: var(--text);
}
.contact-cta {
  padding: 1rem;
  background: var(--accent-violet-subtle);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent-violet);
}
</style>
