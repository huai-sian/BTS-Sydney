<script setup>
import { computed } from 'vue'
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()

const countdownLabel = computed(() => {
  if (store.daysUntilTrip > 0) return `${store.daysUntilTrip}`
  if (store.daysRemaining >= 0) return `${Math.max(store.daysRemaining, 0)}`
  return '0'
})
</script>

<template>
  <section class="hero-panel">
    <div>
      <p class="eyebrow">Feb 19-25, 2027</p>
      <h2>Sydney is on the horizon.</h2>
      <p>{{ store.tripStatus }}</p>
    </div>
    <div class="countdown-badge">
      <strong>{{ countdownLabel }}</strong>
      <span>{{ store.daysUntilTrip > 0 ? 'days' : 'left' }}</span>
    </div>
  </section>
</template>
