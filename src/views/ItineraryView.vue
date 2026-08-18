<script setup>
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()
</script>

<template>
  <div class="view-stack">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Feb 19-25</p>
        <h2>Itinerary</h2>
      </div>
    </section>

    <section class="timeline">
      <article v-for="day in store.itineraryDays" :key="day.date" class="timeline-day">
        <time :datetime="day.date">{{ new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date(`${day.date}T00:00:00`)) }}</time>
        <h3>{{ day.title }}</h3>
        <dl>
          <div>
            <dt>Flights</dt>
            <dd>{{ day.sections.flights }}</dd>
          </div>
          <div>
            <dt>Stay</dt>
            <dd>{{ day.sections.stay }}</dd>
          </div>
          <div>
            <dt>Daily Plan</dt>
            <dd>{{ day.sections.dailyPlan }}</dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd>{{ day.sections.links }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </div>
</template>
