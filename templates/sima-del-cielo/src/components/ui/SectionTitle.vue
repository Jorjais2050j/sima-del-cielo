<script setup lang="ts">
import Reveal from './Reveal.vue'

// Clases completas (no interpoladas) para que Tailwind las detecte
const TONES = { selva: 'text-selva', madera: 'text-madera', maiz: 'text-maiz', cielo: 'text-cielo', barro: 'text-barro' } as const

withDefaults(
  defineProps<{ eyebrow?: string; title: string; as?: 'h1' | 'h2'; dark?: boolean; tone?: keyof typeof TONES }>(),
  { as: 'h2' },
)
</script>

<template>
  <div class="mb-[clamp(40px,6vw,80px)] grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
    <Reveal>
      <div v-if="eyebrow" class="eyebrow" :class="dark && '!text-on-dark-2'">{{ eyebrow }}</div>
      <component :is="as" class="section-title mt-3.5" :class="tone && TONES[tone]">{{ title }}</component>
    </Reveal>
    <!-- slot: controles a la derecha (filtros, tabs, texto introductorio) -->
    <slot />
  </div>
</template>
