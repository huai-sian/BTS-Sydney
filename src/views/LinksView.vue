<script setup>
import { importantLinks } from '../data/trip'
</script>

<template>
  <div class="view-stack">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Private by link</p>
        <h2>Important Links</h2>
      </div>
    </section>

    <section class="link-list">
      <article v-for="link in importantLinks" :key="link.label" class="link-card">
        <div>
          <h3>{{ link.label }}</h3>
          <p>{{ link.description }}</p>
        </div>
        <a v-if="link.url" :href="link.url">Open</a>
        <span v-else class="pill">Add later</span>
      </article>
    </section>
  </div>
</template>
