<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import type { Package } from '@/types/models'
import { site } from '@/config/site'
import { getPackages } from '@/services/packages.service'
import { useAsyncData } from '@/composables/useAsyncData'
import { whatsappLink } from '@/utils/whatsapp'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Reveal from '@/components/ui/Reveal.vue'
import PackageCard from './PackageCard.vue'

const { data: packages } = useAsyncData(getPackages)

const FILTERS = [
  { value: 'all', label: 'Todos', test: () => true },
  { value: 'aventura', label: 'Aventura', test: (p: Package) => p.category === 'aventura' && !p.tags.includes('romantico') },
  { value: 'romantico', label: 'Románticos', test: (p: Package) => p.tags.includes('romantico') },
  { value: 'sesion-fotos', label: 'Sesión de fotos', test: (p: Package) => p.category === 'sesion-fotos' },
] as const
type FilterValue = (typeof FILTERS)[number]['value']
const filter = ref<FilterValue>('all')
const visible = computed(() => (packages.value ?? []).filter(FILTERS.find((f) => f.value === filter.value)!.test))
</script>

<template>
  <section id="paquetes" class="py-[clamp(80px,10vw,160px)]">
    <div class="container-page">
      <SectionTitle eyebrow="Experiencias" title="Paquetes">
        <Reveal><p class="max-w-[46ch] text-[clamp(17px,1.4vw,19px)] text-pretty text-ink-2">{{ site.business.packagesIntro }}</p></Reveal>
      </SectionTitle>
      <SegmentedControl v-model="filter" :options="FILTERS" label="Filtrar paquetes" class="mb-9" />

      <!-- Móvil: carrusel con scroll-snap (tarjeta asomándose). Escritorio: grid de 3. -->
      <div class="no-scrollbar -mx-5 grid auto-cols-[82%] grid-flow-col snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:auto-cols-[46%] lg:mx-0 lg:grid-flow-row lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12 lg:overflow-visible lg:px-0">
        <PackageCard v-for="p in visible" :key="p.id" :item="p" class="snap-start" />
      </div>

      <div class="mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-ink-2">
        <span>{{ site.business.pricesNote }}</span>
        <a :href="whatsappLink()" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[15px] font-medium text-ink">Reservaciones por WhatsApp <ArrowRight :size="16" /></a>
      </div>

      <Accordion title="Recomendaciones para tu visita">
        <div class="grid gap-x-12 gap-y-7 md:grid-cols-3">
          <div v-for="r in site.visit.recommendations" :key="r.title">
            <h4 class="mb-1.5 text-[13px] font-semibold tracking-[.12em] uppercase">{{ r.title }}</h4>
            <p class="text-[15px] text-ink-2">{{ r.text }}</p>
          </div>
        </div>
      </Accordion>
    </div>
  </section>
</template>
