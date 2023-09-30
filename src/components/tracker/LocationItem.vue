<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div
    class="flex flex-1 flex-col items-center h-[50px] xs:h-[90px] justify-center pl-2"
  >
    <p class="text-sm uppercase font-bold text-slate-400">{{ label }}</p>
    <p class="text-lg xs:text-sm md:text-xl font-bold">{{ value }}</p>
  </div>
</template>
