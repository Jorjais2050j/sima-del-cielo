<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
defineProps<{ title: string }>()
</script>

<template>
  <details class="group mt-12 border-y border-line">
    <summary class="flex cursor-pointer list-none items-center justify-between py-6.5 font-serif text-[clamp(22px,2.2vw,28px)] [&::-webkit-details-marker]:hidden">
      {{ title }}
      <Plus :size="22" class="transition-transform duration-400 ease-premium group-open:rotate-45" />
    </summary>
    <div class="pb-10"><slot /></div>
  </details>
</template>
