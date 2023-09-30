<script lang="ts" setup>
import { ref, watch } from 'vue';
import Right_Arrow from '../icons/arrow.vue';
import { IPIFY } from '@/utils/apis';
import type { Ipify_Response } from '@/types/apis';
import LocationBoxVue from './LocationContainer.vue';

const location = ref<null | Ipify_Response>(null);
const emit = defineEmits<{
  (e: 'setLocation', location: Ipify_Response): void;
}>();
const ipify = new IPIFY();
const serachValue = ref('');
const isInvalid = ref(false);
const isLoading = ref(false);
watch(serachValue, () => {
  if (isInvalid.value) isInvalid.value = false;
});

const handleSearch = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const response = await ipify.search(serachValue.value);
  if (response === 'ERROR') {
    isInvalid.value = true;
    return;
  }
  if (response) {
    location.value = response;
    emit('setLocation', location.value);
  }
  isLoading.value = false;
};
</script>

<template>
  <div
    class="container gap-6 flex flex-col justify-items-center items-center h-full relative"
  >
    <h1 class="text-white sm:text-3xl text-xl mt-10 font-bold">
      IP Address Tracker
    </h1>
    <!-- search input -->
    <div class="flex-col">
      <div class="flex w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw]">
        <input
          class="p-3 border-transparent border-2 placeholder:text-[10px] sm:placeholder:text-xs rounded-l-xl w-[90%] focus-visible:outline-none"
          placeholder="Search for any IP address or domain "
          :class="{ ' border-red-500  border-2': isInvalid }"
          type="text"
          v-model="serachValue"
          :disabled="isLoading"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="p-3 rounded-r-xl bg-black text-white w-[50px] active:opacity-70"
          :disabled="isLoading"
        >
          <Right_Arrow />
        </button>
      </div>
      <span v-if="isInvalid" class="text-sm text-red-500">
        invalid IP address or domain
      </span>
    </div>
    <LocationBoxVue v-if="location !== null" :location="location" />
  </div>
</template>

<style scoped>
.container {
  min-width: 100%;
  min-height: 100%;
  background-image: url('/images/pattern-bg-desktop.png');
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (max-width: 500px) {
  .container {
    background-image: url('/images/pattern-bg-mobile.png');
  }
}
</style>
