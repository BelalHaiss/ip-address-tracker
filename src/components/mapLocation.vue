<script setup lang="ts">
import type { Ipify_Response } from '@/types/apis';
import { fetcher } from '@/utils/apis';
import mapboxgl from 'mapbox-gl';
import { onMounted, watch } from 'vue';

interface Props {
  location: Ipify_Response | null;
}

const props = defineProps<Props>();
let map: mapboxgl.Map;
onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [31, 30],
    zoom: 5
  });
});
watch(
  () => props.location,
  async (location) => {
    if (!location) return;
    const response = await fetcher<GeoJSON.FeatureCollection>({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location.location.region
      )}.json?access_token=${mapboxgl.accessToken}`
    });

    if (response) {
      // @ts-ignore point type
      const { coordinates } = response.features[0].geometry;
      const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

      // Center the map on Cairo
      map.flyTo({
        center: coordinates,
        zoom: 10, // Adjust the zoom level as needed
        speed: 1.5, // Adjust the fly animation speed as needed
        essential: true
      });
    }
  }
);
</script>

<template>
  <div class="min-h-full" id="map">location</div>
</template>
