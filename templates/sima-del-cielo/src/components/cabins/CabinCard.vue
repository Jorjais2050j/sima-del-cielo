<script setup lang="ts">
import type { Cabin } from '@/types/models'
import BaseButton from '@/components/ui/BaseButton.vue'
import { formatMoney, formatPriceUnit } from '@/utils/format'
import { whatsappLink } from '@/utils/whatsapp'
import CabinGallery from './CabinGallery.vue'

/**
 * Presentación completa de una cabaña. Reutilizable en:
 *  - la home (dentro de CabinsSection)
 *  - /cabanas
 *  - Fase 2: /reservar/cabana/:slug → usar el slot `actions` para el selector de fechas/huéspedes.
 */
defineProps<{ cabin: Cabin }>()
</script>

<template>
  <article class="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
    <CabinGallery :images="cabin.images" :label="cabin.name" />
    <div class="flex flex-col gap-5.5">
      <div class="eyebrow">Cabaña</div>
      <h3 class="font-serif text-[clamp(52px,6vw,88px)] leading-[.95] font-light tracking-[-.035em]">{{ cabin.name }}</h3>
      <p v-if="cabin.description" class="text-ink-2">{{ cabin.description }}</p>
      <div class="flex items-baseline gap-2.5 font-serif text-[30px] leading-none">
        {{ formatMoney(cabin.price) }}<small class="font-sans text-sm text-ink-2">MXN {{ formatPriceUnit(cabin.price) }}</small>
      </div>
      <ul class="text-[15px] leading-snug text-ink-2">
        <li v-for="f in cabin.features" :key="f" class="border-t border-line py-2.5">{{ f }}</li>
      </ul>
      <slot name="actions">
        <BaseButton :href="whatsappLink(`Hola, me interesa hospedarme en la cabaña ${cabin.name}.`)" class="mt-1.5 self-start">Consultar disponibilidad</BaseButton>
      </slot>
    </div>
  </article>
</template>
