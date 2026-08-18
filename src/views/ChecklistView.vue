<script setup>
import { ref } from 'vue'
import ProgressRing from '../components/ProgressRing.vue'
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()
const newItem = ref('')

function addItem() {
  store.addChecklistItem(newItem.value)
  newItem.value = ''
}
</script>

<template>
  <div class="view-stack">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Pre-trip</p>
        <h2>Checklist</h2>
      </div>
      <ProgressRing :value="store.checklistProgress.percent" />
    </section>

    <form class="add-row" @submit.prevent="addItem">
      <input v-model="newItem" type="text" placeholder="Add a prep item" aria-label="Add checklist item" />
      <button type="submit">Add</button>
    </form>

    <section class="checklist">
      <label v-for="item in store.checklist" :key="item.id" class="check-item">
        <input type="checkbox" :checked="item.done" @change="store.toggleChecklistItem(item.id)" />
        <span>
          <strong>{{ item.label }}</strong>
          <small>{{ item.category }}</small>
        </span>
      </label>
    </section>
  </div>
</template>
