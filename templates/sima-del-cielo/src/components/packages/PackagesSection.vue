<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowRight, ChevronDown } from 'lucide-vue-next'
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

// En móvil se muestran 4 tarjetas y un botón para ver el resto.
const MOBILE_LIMIT = 4
const expanded = ref(false)
const clipped = computed(() => !expanded.value && visible.value.length > MOBILE_LIMIT)
watch(filter, () => { expanded.value = false })
</script>

<template>
  <section id="paquetes" class="py-[clamp(80px,10vw,160px)]">
    <div class="container-page">
      <SectionTitle eyebrow="Experiencias" title="Paquetes" tone="selva">
        <Reveal><p class="max-w-[46ch] text-[clamp(17px,1.4vw,19px)] text-pretty text-ink-2">{{ site.business.packagesIntro }}</p></Reveal>
      </SectionTitle>
      <SegmentedControl v-model="filter" :options="FILTERS" label="Filtrar paquetes" class="mb-9" />

      <!-- Móvil: lista vertical (sin scroll lateral). Tablet: 2 columnas. Escritorio: 3. -->
      <div class="grid gap-11 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-7">
        <PackageCard
          v-for="(p, i) in visible" :key="p.id" :item="p" mobile-ratio="4/3"
          :class="{ 'max-sm:hidden': clipped && i >= MOBILE_LIMIT }"
        />
      </div>
      <button
        v-if="clipped" type="button"
        class="mt-9 flex h-13 w-full items-center justify-center gap-2 rounded-full border border-line text-[15px] font-medium text-ink transition-colors duration-300 hover:border-ink/30 sm:hidden"
        @click="expanded = true"
      >
        Ver los {{ visible.length }} paquetes <ChevronDown :size="16" />
      </button>

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
