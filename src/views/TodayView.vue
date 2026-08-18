<script setup>
import { computed, onMounted } from 'vue'
import CountdownPanel from '../components/CountdownPanel.vue'
import ProgressRing from '../components/ProgressRing.vue'
import { useTripStore } from '../stores/tripStore'
import { describeWeather } from '../services/weather'

const store = useTripStore()

const weatherSummary = computed(() => {
  if (!store.weather?.current) return 'No weather saved yet'
  return `${Math.round(store.weather.current.temperature_2m)}${store.weather.currentUnits.temperature_2m} · ${describeWeather(store.weather.current.weather_code)}`
})

onMounted(() => {
  if (!store.weather) store.refreshWeather()
})
</script>

<template>
  <div class="view-stack">
    <CountdownPanel />

    <section class="section-grid">
      <article class="info-card">
        <div class="card-heading">
          <h2>Prep</h2>
          <ProgressRing :value="store.checklistProgress.percent" />
        </div>
        <p>{{ store.checklistProgress.done }} of {{ store.checklistProgress.total }} checklist items ready.</p>
        <RouterLink to="/checklist" class="text-link">Open checklist</RouterLink>
      </article>

      <article class="info-card">
        <div class="card-heading">
          <h2>Weather</h2>
          <span class="pill">{{ store.weatherStatus }}</span>
        </div>
        <p>{{ weatherSummary }}</p>
        <RouterLink to="/weather" class="text-link">Check Sydney weather</RouterLink>
      </article>
    </section>

    <section class="content-band">
      <div class="section-title">
        <p class="eyebrow">Quick glance</p>
        <h2>Trip anchors</h2>
      </div>
      <div class="anchor-list">
        <RouterLink to="/itinerary">Daily plan</RouterLink>
        <RouterLink to="/links">Important links</RouterLink>
        <RouterLink to="/weather">Forecast</RouterLink>
      </div>
    </section>
  </div>
</template>
