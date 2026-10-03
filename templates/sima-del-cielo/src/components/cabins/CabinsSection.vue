<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { site } from '@/config/site'
import { getCabinExperiences, getCabins } from '@/services/cabins.service'
import { useAsyncData } from '@/composables/useAsyncData'
import { formatMoney } from '@/utils/format'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import Accordion from '@/components/ui/Accordion.vue'
import PackageCard from '@/components/packages/PackageCard.vue'
import CabinCard from './CabinCard.vue'

const { data: cabins } = useAsyncData(getCabins)
const { data: experiences } = useAsyncData(getCabinExperiences)

const TABS = [{ value: 'cabana', label: 'Cabañas' }, { value: 'romantico', label: 'Románticos' }] as const
const tab = ref<(typeof TABS)[number]['value']>('cabana')
const selected = ref(0)
const current = computed(() => cabins.value?.[selected.value])
const stay = site.stay
</script>

<template>
  <section id="cabanas" class="bg-surface py-[clamp(80px,10vw,160px)]">
    <div class="container-page">
      <SectionTitle title="Cabañas">
        <SegmentedControl v-model="tab" :options="TABS" label="Categoría" />
      </SectionTitle>

      <div v-show="tab === 'cabana'">
        <!-- Selector tipográfico de cabañas -->
        <div class="no-scrollbar -mx-5 mb-7 flex overflow-x-auto px-5 md:mx-0 md:mb-9 md:px-0" role="tablist" aria-label="Elige una cabaña">
          <button
            v-for="(c, i) in cabins ?? []" :key="c.id" role="tab" :aria-selected="i === selected"
            class="relative mr-6.5 flex-none py-2.5 font-serif text-[clamp(24px,2.6vw,34px)] leading-tight font-light transition-colors"
            :class="i === selected ? 'text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink' : 'text-ink/40 hover:text-ink-2'"
            @click="selected = i"
          >{{ c.name }}</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div v-if="current" :key="current.id" :initial="{ opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }" :transition="{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }">
            <CabinCard :cabin="current" />
          </motion.div>
        </AnimatePresence>

        <div class="mt-[clamp(56px,7vw,96px)] grid gap-8 md:grid-cols-3">
          <div><h4 class="eyebrow mb-3.5">Todas las tarifas incluyen</h4><p class="font-serif text-[22px] leading-snug">{{ stay.includes.join(' · ') }}</p></div>
          <div><h4 class="eyebrow mb-3.5">Horarios</h4><p class="font-serif text-[22px] leading-snug">Check-in a partir de las {{ stay.checkIn }} · Check-out a las {{ stay.checkOut }}</p></div>
          <div><h4 class="eyebrow mb-3.5">Persona extra</h4><p class="font-serif text-[22px] leading-snug">{{ formatMoney(stay.extraGuestFee) }} MXN por persona</p></div>
        </div>
        <Accordion title="Reglamento de cabañas">
          <ol class="list-decimal columns-1 gap-14 pl-5 text-[15px] text-ink-2 lg:columns-2">
            <li v-for="r in stay.rules" :key="r" class="break-inside-avoid pb-3 pl-1.5">{{ r }}</li>
          </ol>
        </Accordion>
      </div>

      <div v-show="tab === 'romantico'">
        <p class="mb-10 max-w-[46ch] text-[clamp(17px,1.4vw,19px)] text-ink-2">Decoración romántica para tu cabaña. No incluye noche de hospedaje.</p>
        <div class="grid gap-7 md:grid-cols-2 md:gap-10">
          <PackageCard
            v-for="x in experiences ?? []" :key="x.id" :item="{ ...x, tags: ['romantico'] }" ratio="4/3"
            cta-label="Consultar" :cta-message="`Hola, me interesa la decoración romántica: ${x.name}.`"
          />
        </div>
      </div>
    </div>
  </section>
</template>
