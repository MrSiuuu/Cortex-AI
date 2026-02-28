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
  padding: 4rem 0;
  background: var(--section-bg);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  position: relative;
}

.step {
  position: relative;
  text-align: center;
}

.step-num {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient);
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 50%;
  box-shadow: var(--glow-violet);
}
.step-title {
  font-size: 1.1rem;
  margin: 0 0 0.35rem;
  color: var(--text);
}
.step-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}
.step-connector {
  display: none;
}
@media (min-width: 700px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
  }
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
