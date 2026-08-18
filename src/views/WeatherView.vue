<script setup>
import { computed, onMounted } from 'vue'
import { useTripStore } from '../stores/tripStore'
import { describeWeather } from '../services/weather'

const store = useTripStore()

const current = computed(() => store.weather?.current)
const units = computed(() => store.weather?.currentUnits || {})
const fetchedAt = computed(() => {
  if (!store.weather?.fetchedAt) return ''
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(store.weather.fetchedAt))
})

onMounted(() => {
  if (!store.weather) store.refreshWeather()
})
</script>

<template>
  <div class="view-stack">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Sydney, Australia</p>
        <h2>Weather</h2>
      </div>
      <button type="button" class="ghost-button" @click="store.refreshWeather">
        {{ store.weatherStatus === 'loading' || store.weatherStatus === 'refreshing' ? 'Refreshing' : 'Refresh' }}
      </button>
    </section>

    <section class="weather-panel">
      <template v-if="current">
        <p class="eyebrow">{{ describeWeather(current.weather_code) }}</p>
        <div class="weather-temp">{{ Math.round(current.temperature_2m) }}{{ units.temperature_2m }}</div>
        <p>Feels like {{ Math.round(current.apparent_temperature) }}{{ units.apparent_temperature }} with {{ current.wind_speed_10m }} {{ units.wind_speed_10m }} wind.</p>
      </template>
      <template v-else>
        <p>No saved weather yet.</p>
      </template>
    </section>

    <p v-if="store.weatherError" class="status-note">{{ store.weatherError }}</p>
    <p v-if="fetchedAt" class="status-note">Last updated {{ fetchedAt }}.</p>
    <p class="status-note">
      Current Sydney weather is shown now. Trip-week forecast will appear when February 19-25, 2027 is within Open-Meteo's forecast window.
    </p>

    <section v-if="store.weather?.daily" class="forecast-list">
      <article v-for="date in store.weather.daily.time" :key="date" class="forecast-day">
        <strong>{{ new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${date}T00:00:00`)) }}</strong>
        <span>{{ describeWeather(store.weather.daily.weather_code[store.weather.daily.time.indexOf(date)]) }}</span>
        <small>
          {{ Math.round(store.weather.daily.temperature_2m_min[store.weather.daily.time.indexOf(date)]) }}-
          {{ Math.round(store.weather.daily.temperature_2m_max[store.weather.daily.time.indexOf(date)]) }}°C
        </small>
      </article>
    </section>
  </div>
</template>
