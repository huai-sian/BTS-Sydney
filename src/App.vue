<script setup>
import { routes } from './router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">Trip companion</p>
        <h1>BTS Sydney</h1>
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
