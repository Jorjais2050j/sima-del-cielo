<script setup lang="ts">
import { computed } from 'vue'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, LOCATION, PHONE_DISPLAY, PHONE_E164, site } from '@/config/site'
import Reveal from '@/components/ui/Reveal.vue'
import LocationMap from './LocationMap.vue'

const rows = computed(() => [
  { label: 'Teléfono', value: PHONE_DISPLAY, href: `tel:${PHONE_E164}` },
  { label: 'Instagram', value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL, external: true },
  ...(site.contact.email ? [{ label: 'Correo', value: site.contact.email, href: `mailto:${site.contact.email}` }] : []),
  { label: 'Dirección', value: `${LOCATION.addressLine}, ${LOCATION.postalCode} ${LOCATION.locality}, ${LOCATION.region}` },
  { label: 'Cabañas', value: `Check-in ${site.stay.checkIn} · Check-out ${site.stay.checkOut}` },
  ...(site.hours ? [{ label: 'Horario', value: site.hours }] : []),
])
</script>

<template>
  <section id="contacto" class="pb-[clamp(80px,10vw,160px)]">
    <div class="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
      <Reveal>
        <div class="eyebrow">Contacto</div>
        <h2 class="mt-3.5 font-serif text-[clamp(44px,7vw,104px)] leading-[.95] font-light tracking-[-.03em]">Visítanos</h2>
        <ul class="mt-10">
          <li v-for="r in rows" :key="r.label" class="grid gap-1.5 border-t border-line py-5 last:border-b">
            <span class="eyebrow text-[11px]">{{ r.label }}</span>
            <a v-if="r.href" :href="r.href" :target="r.external ? '_blank' : undefined" :rel="r.external ? 'noopener' : undefined" class="font-serif text-[clamp(22px,2vw,26px)] leading-snug">{{ r.value }}</a>
            <span v-else class="font-serif text-[clamp(22px,2vw,26px)] leading-snug">{{ r.value }}</span>
          </li>
        </ul>
      </Reveal>
      <Reveal :delay="0.1"><LocationMap /></Reveal>
    </div>
  </section>
</template>
