<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL } from '@/config/site'
import BaseButton from '@/components/ui/BaseButton.vue'

/**
 * Mapa vía iframe embed (sin API key, loading="lazy" → no afecta LCP).
 * Para cambiar ubicación edita `location` en src/content/site.json.
 * Si más adelante se requiere mapa interactivo (JS API), sustituir sólo este componente.
 */
withDefaults(defineProps<{ embedUrl?: string; mapsUrl?: string; title?: string }>(), {
  embedUrl: GOOGLE_MAPS_EMBED_URL,
  mapsUrl: GOOGLE_MAPS_URL,
  title: 'Ubicación de Sima del Cielo en Google Maps',
})
</script>

<template>
  <div class="relative aspect-[4/5] overflow-hidden rounded-card bg-surface sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
    <iframe :src="embedUrl" :title="title" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="absolute inset-0 size-full border-0 grayscale-[.35]" />
    <BaseButton :href="mapsUrl" class="absolute bottom-4 left-4 z-10 shadow-[0_8px_24px_rgba(0,0,0,.18)]"><MapPin :size="18" /> Abrir en Google Maps</BaseButton>
  </div>
</template>
