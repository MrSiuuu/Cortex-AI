<script setup>
const steps = [
  { num: 1, title: 'Vous nous parlez de votre business', desc: 'Ou parlez à notre IA ci-dessous' },
  { num: 2, title: 'On configure votre chatbot IA en 48h', desc: 'Personnalisation et formation sur vos données' },
  { num: 3, title: "On l'installe sur votre site", desc: "Une ligne de code à copier-coller" },
  { num: 4, title: 'Vos clients sont accompagnés 24/7', desc: "Vous recevez les résumés et les leads" }
]
</script>

<template>
  <section id="comment-ca-marche" class="how">
    <div class="container">
      <h2 class="section-title">Comment ça marche</h2>
      <p class="section-subtitle">
        En trois étapes, votre chatbot IA est en ligne et opérationnel.
      </p>

      <div class="steps">
        <div
          v-for="(step, i) in steps"
          :key="step.num"
          class="step"
          :class="{ last: i === steps.length - 1 }"
        >
          <div class="step-num">{{ step.num }}</div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
          <div v-if="i < steps.length - 1" class="step-connector"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how {
  padding: 2.5rem 0;
  background: var(--section-bg);
}
@media (min-width: 480px) {
  .how {
    padding: 3rem 0;
  }
}
@media (min-width: 768px) {
  .how {
    padding: 4rem 0;
  }
}

.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  position: relative;
}
@media (min-width: 500px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }
}
@media (min-width: 700px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

.step {
  position: relative;
  text-align: center;
}

.step-num {
  width: 44px;
  height: 44px;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient);
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  border-radius: 50%;
  box-shadow: var(--glow-violet);
}
@media (min-width: 480px) {
  .step-num {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
}
.step-title {
  font-size: 1rem;
  margin: 0 0 0.25rem;
  color: var(--text);
}
@media (min-width: 480px) {
  .step-title {
    font-size: 1.1rem;
    margin-bottom: 0.35rem;
  }
}
.step-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.45;
}
@media (min-width: 480px) {
  .step-desc {
    font-size: 0.9rem;
  }
}
.step-connector {
  display: none;
}
@media (min-width: 700px) {
  .step-connector {
    display: block;
    position: absolute;
    top: 24px;
    left: calc(50% + 32px);
    right: -50%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-violet), transparent);
    opacity: 0.5;
  }
  .step.last .step-connector {
    display: none;
  }
}
</style>
