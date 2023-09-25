<script setup lang="ts">
import { ref } from 'vue';
import IpTracker from './components/tracker/ipTracker.vue';
import MapLocation from './components/mapLocation.vue';
import type { Ipify_Response } from './types/apis';

const location = ref<Ipify_Response | null>(null);
const getLocation = (selectedLocation: Ipify_Response) =>
  (location.value = selectedLocation);
</script>

<template>
  <header>
    <IpTracker @set-location="getLocation" />
  </header>

  <main>
    <MapLocation :location="location" />
  </main>
</template>

<style>
header {
  min-width: 100%;
  height: 35vh;
  border-bottom: 1px solid gainsboro;
}

main {
  height: 65vh;
}
</style>
