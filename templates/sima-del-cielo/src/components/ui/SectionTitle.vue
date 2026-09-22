<script setup lang="ts">
import Reveal from './Reveal.vue'
withDefaults(defineProps<{ eyebrow?: string; title: string; as?: 'h1' | 'h2'; dark?: boolean }>(), { as: 'h2' })
</script>

<template>
  <div class="mb-[clamp(40px,6vw,80px)] grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
    <Reveal>
      <div v-if="eyebrow" class="eyebrow" :class="dark && '!text-on-dark-2'">{{ eyebrow }}</div>
      <component :is="as" class="mt-3.5 font-serif text-[clamp(44px,7vw,104px)] leading-[.95] font-light tracking-[-.03em]">{{ title }}</component>
    </Reveal>
    <!-- slot: controles a la derecha (filtros, tabs, texto introductorio) -->
    <slot />
  </div>
</template>
