import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { defaultChecklist, itineraryDays, trip } from '../data/trip'
import { fetchSydneyWeather, getCachedWeather } from '../services/weather'

const CHECKLIST_KEY = 'bts-sydney-checklist'

function loadChecklist() {
  const raw = localStorage.getItem(CHECKLIST_KEY)
  if (!raw) return defaultChecklist.map((item) => ({ ...item, done: false }))

  try {
    const saved = JSON.parse(raw)
    const savedById = new Map(saved.map((item) => [item.id, item]))
    const seeded = defaultChecklist.map((item) => ({ ...item, done: Boolean(savedById.get(item.id)?.done) }))
    const custom = saved.filter((item) => item.custom)
    return [...seeded, ...custom]
  } catch {
    return defaultChecklist.map((item) => ({ ...item, done: false }))
  }
}

function daysBetween(from, to) {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.ceil((end - start) / 86400000)
}

export const useTripStore = defineStore('trip', () => {
  const checklist = ref(loadChecklist())
  const weather = ref(getCachedWeather())
  const weatherStatus = ref(weather.value ? 'cached' : 'idle')
  const weatherError = ref('')

  const startDate = computed(() => new Date(`${trip.startDate}T00:00:00`))
  const endDate = computed(() => new Date(`${trip.endDate}T23:59:59`))
  const today = computed(() => new Date())
  const daysUntilTrip = computed(() => daysBetween(today.value, startDate.value))
  const daysRemaining = computed(() => daysBetween(today.value, endDate.value))
  const isTripForecastWindow = computed(() => {
    const daysUntil = daysUntilTrip.value
    return daysUntil <= 16 && daysUntil >= -7
  })
  const tripStatus = computed(() => {
    if (today.value < startDate.value) return `${daysUntilTrip.value} days to go`
    if (today.value <= endDate.value) return 'Trip in progress'
    return 'Trip complete'
  })
  const checklistProgress = computed(() => {
    const total = checklist.value.length
    const done = checklist.value.filter((item) => item.done).length
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 }
  })

  function persistChecklist() {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist.value))
  }

  function toggleChecklistItem(id) {
    const item = checklist.value.find((entry) => entry.id === id)
    if (!item) return
    item.done = !item.done
    persistChecklist()
  }

  function addChecklistItem(label) {
    const cleanLabel = label.trim()
    if (!cleanLabel) return

    checklist.value.push({
      id: `custom-${Date.now()}`,
      label: cleanLabel,
      category: 'Custom',
      done: false,
      custom: true,
    })
    persistChecklist()
  }

  async function refreshWeather() {
    weatherStatus.value = weather.value ? 'refreshing' : 'loading'
    weatherError.value = ''

    try {
      weather.value = await fetchSydneyWeather()
      weatherStatus.value = 'fresh'
    } catch (error) {
      weatherError.value = 'Could not refresh weather. Showing the last saved forecast if available.'
      weatherStatus.value = weather.value ? 'cached' : 'error'
    }
  }

  return {
    trip,
    itineraryDays,
    checklist,
    weather,
    weatherStatus,
    weatherError,
    daysUntilTrip,
    daysRemaining,
    tripStatus,
    checklistProgress,
    isTripForecastWindow,
    toggleChecklistItem,
    addChecklistItem,
    refreshWeather,
  }
})
