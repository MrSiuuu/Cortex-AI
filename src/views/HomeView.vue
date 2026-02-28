<script setup>
import HomeHeader from '../components/HomeHeader.vue'
import ServicesSection from '../components/ServicesSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import PricingSection from '../components/PricingSection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <div class="home">
    <HomeHeader />
    <ServicesSection />
    <HowItWorksSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.home {
  overflow-x: hidden;
}
</style>
