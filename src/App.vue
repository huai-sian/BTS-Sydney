<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routes } from './router'

const route = useRoute()
const router = useRouter()
const previousPath = ref('')

router.afterEach((to, from) => {
  if (from.name && from.fullPath !== to.fullPath) {
    previousPath.value = from.fullPath
  }
})

const showBackButton = computed(() => Boolean(previousPath.value || route.path !== '/'))

function goBack() {
  if (previousPath.value) {
    router.back()
    return
  }

  router.push('/')
}
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="header-title">
        <button v-if="showBackButton" type="button" class="back-button" aria-label="Back to last page" @click="goBack"></button>
        <div>
          <p class="eyebrow">Trip companion</p>
          <h1>BTS Sydney</h1>
        </div>
      </div>
      <div class="header-mark" aria-hidden="true">SYD</div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <nav class="tab-bar" aria-label="Primary navigation">
      <RouterLink v-for="route in routes" :key="route.name" :to="route.path" class="tab-link">
        <span class="tab-icon" aria-hidden="true">{{ route.meta.icon }}</span>
        <span>{{ route.meta.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
