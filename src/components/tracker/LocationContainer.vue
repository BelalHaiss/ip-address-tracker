<script setup lang="ts">
import type { Ipify_Response } from '@/types/apis';
import LocationItem from './LocationItem.vue';

const { location } = defineProps<{
  location: Ipify_Response | null;
}>();
</script>

<template>
  <div v-if="location" class="sm:divide-x-2 location-container">
    <LocationItem :label="'ip address'" :value="location.ip" />
    <LocationItem
      :label="'location'"
      :value="location.location.country + location.location.region"
    />
    <LocationItem :label="'ip address'" :value="location.ip" />
    <LocationItem :label="'ip address'" :value="location.ip" />
  </div>
</template>

<style scoped>
.location-container {
  border-radius: 15px;
  position: absolute;
  width: 90vw;
  z-index: 1000;
  display: grid;
  padding: 10px;
  justify-content: center;
  align-items: center;
  min-height: 130px;
  max-height: 150px;
  gap: 1rem;
  top: 78%;
  background-color: white;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

@media screen and (max-width: 400px) {
  .location-container {
    top: 50%;
  }
}
</style>
