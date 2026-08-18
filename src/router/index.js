import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '../views/TodayView.vue'
import ChecklistView from '../views/ChecklistView.vue'
import WeatherView from '../views/WeatherView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import LinksView from '../views/LinksView.vue'

const routes = [
  { path: '/', name: 'today', component: TodayView, meta: { label: 'Today', icon: 'spark' } },
  { path: '/checklist', name: 'checklist', component: ChecklistView, meta: { label: 'Checklist', icon: 'check' } },
  { path: '/weather', name: 'weather', component: WeatherView, meta: { label: 'Weather', icon: 'sun' } },
  { path: '/itinerary', name: 'itinerary', component: ItineraryView, meta: { label: 'Itinerary', icon: 'map' } },
  { path: '/links', name: 'links', component: LinksView, meta: { label: 'Links', icon: 'link' } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

export { routes }
