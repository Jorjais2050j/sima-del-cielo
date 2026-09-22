<script setup lang="ts">
import type { Media } from '@/types/models'
import Reveal from '@/components/ui/Reveal.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
defineProps<{ eyebrow: string; text: string; image: Media }>()
</script>

<template>
  <section class="py-[clamp(96px,14vw,200px)]" aria-label="Sobre Sima del Cielo">
    <div class="container-page grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
      <Reveal>
        <div class="eyebrow">{{ eyebrow }}</div>
        <p class="mt-4.5 font-serif text-[clamp(20px,3.6vw,52px)] leading-[1.22] font-light tracking-[-.02em] text-pretty">{{ text }}</p>
      </Reveal>
      <!-- Apertura circular: evoca mirar hacia arriba desde el fondo de la sima. Se abre con el scroll. -->
      <div class="aperture aspect-square w-full max-w-[560px] justify-self-center overflow-hidden rounded-full bg-surface">
        <ResponsiveImage :media="image" sizes="(min-width:1024px) 40vw, 90vw" class="size-full object-cover" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@supports (animation-timeline: view()) {
  .aperture { border-radius: 0; clip-path: circle(34% at 50% 50%); animation: aperture linear both; animation-timeline: view(); animation-range: entry 10% cover 55%; }
  @keyframes aperture { to { clip-path: circle(50% at 50% 50%); } }
}
</style>
