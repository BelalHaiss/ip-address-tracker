<script setup lang="ts">
import type { Ipify_Response } from '@/types/apis';
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';

interface Props {
  location: Ipify_Response | null;
}

const data = defineProps<Props>();
onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [31, 30],
    zoom: 5
  });
});
</script>

<template>
  <div class="min-h-full" id="map">location</div>
</template>
