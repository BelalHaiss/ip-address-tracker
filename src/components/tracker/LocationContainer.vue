<script setup lang="ts">
import type { Ipify_Response } from '@/types/apis';
import LocationItem from './LocationItem.vue';
import { computed } from 'vue';

const props = defineProps<{
  location: Ipify_Response;
}>();
const locationValues = computed(() => [
  { label: 'ip address', value: props.location.ip },
  { label: 'location', value: props.location.location.region },
  { label: 'timezone', value: 'UTC ' + props.location.location.timezone },
  { label: 'isp', value: props.location.isp }
]);
</script>

<template>
  <div class="xs:divide-x location-container">
    <LocationItem
      v-for="{ label, value } in locationValues"
      :label="label"
      :value="value"
      :key="value"
    />
  </div>
</template>

<style scoped>
.location-container {
  border-radius: 15px;
  position: absolute;
  width: 90vw;
  z-index: 1000;
  justify-content: space-around;
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 2rem;
  top: 78%;
  background-color: white;
}

@media screen and (max-width: 499.9px) {
  .location-container {
    top: 61%;
    gap: 1rem;
    flex-direction: column;
  }
}
</style>
