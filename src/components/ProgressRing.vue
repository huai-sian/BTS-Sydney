<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="progress-ring" :style="{ '--progress': `${value}%` }">
    <span>{{ value }}%</span>
  </div>
</template>
