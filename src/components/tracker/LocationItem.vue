<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center sm:justify-start">
    <p class="text-sm capitalize font-bold text-slate-400">{{ label }}</p>
    <p class="text-xl font-bold">{{ value }}</p>
  </div>
</template>
