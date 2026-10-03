<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { siInstagram } from 'simple-icons'
import type { Media, Price } from '@/types/models'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { SCHEDULE_LABEL, formatMoney, formatPriceUnit } from '@/utils/format'
import { whatsappLink } from '@/utils/whatsapp'

/**
 * Tarjeta de oferta: sirve para Package y CabinExperience (misma forma).
 * Fase 1: CTA → WhatsApp con mensaje prellenado.
 * Fase 2: pasar `selectable` y escuchar @select para abrir fecha/disponibilidad/reserva,
 *         sin cambiar la presentación.
 */
type Offer = {
  name: string; price: Price; includes: string[]; notes: string[]; images: Media[]
  schedule?: 'am' | 'pm' | null; tags?: string[]; reel?: string | null
}
const props = withDefaults(defineProps<{ item: Offer; ratio?: string; mobileRatio?: string; ctaLabel?: string; ctaMessage?: string; selectable?: boolean }>(), {
  ratio: '4/5',
  ctaLabel: 'Consultar disponibilidad',
  selectable: false,
})
const emit = defineEmits<{ select: [item: Offer] }>()

const fullName = computed(() => props.item.name + (props.item.schedule ? ` ${SCHEDULE_LABEL[props.item.schedule]}` : ''))
const cta = computed(() => whatsappLink(props.ctaMessage ?? `Hola, me interesa ${fullName.value}.`))
const isRomantic = computed(() => props.item.tags?.includes('romantico'))
</script>

<template>
  <article class="group flex min-w-0 flex-col">
    <div class="relative aspect-(--ratio-sm) overflow-hidden rounded-card bg-surface sm:aspect-(--ratio)" :style="{ '--ratio': ratio, '--ratio-sm': mobileRatio ?? ratio }">
      <ResponsiveImage :media="item.images[0]!" sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" class="size-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.04]" />
      <span v-if="item.schedule" class="chip left-3.5">{{ SCHEDULE_LABEL[item.schedule] }}</span>
      <span v-if="isRomantic" class="chip right-3.5">Romántico</span>
    </div>
    <div class="flex flex-1 flex-col gap-3.5 px-1 pt-5.5">
      <div class="flex items-baseline justify-between gap-3">
        <h3 class="font-serif text-[30px] leading-[1.05] tracking-[-.02em]">{{ item.name }}</h3>
        <div class="text-right text-[15px] leading-tight font-medium whitespace-nowrap">
          {{ formatMoney(item.price) }}<small class="block text-[13px] font-normal text-ink-2">{{ formatPriceUnit(item.price) }}</small>
        </div>
      </div>
      <ul class="text-justify text-[15px] leading-snug hyphens-auto text-ink-2">
        <li v-for="line in item.includes" :key="line" class="border-t border-line py-2.5">{{ line }}</li>
      </ul>
      <p v-for="n in item.notes" :key="n" class="text-[13.5px] text-ink-2 italic">{{ n }}</p>
      <div class="mt-auto flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-1.5">
        <button v-if="selectable" type="button" class="cta" @click="emit('select', item)">Seleccionar <ArrowRight :size="16" /></button>
        <a v-else :href="cta" target="_blank" rel="noopener" class="cta">{{ ctaLabel }} <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" /></a>
        <a v-if="item.reel" :href="item.reel" target="_blank" rel="noopener" :aria-label="`Ver reel de ${fullName} en Instagram`" class="reel"><BrandIcon :icon="siInstagram" :size="15" /> Ver reel</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
@reference "@/assets/styles/main.css";
.chip { @apply absolute top-3.5 inline-flex h-7 items-center rounded-full bg-bg/90 px-3 text-[11px] font-semibold tracking-[.12em] text-ink uppercase backdrop-blur-sm; }
.cta { @apply inline-flex items-center gap-2 text-[15px] font-medium text-ink; }
.reel { @apply inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-2 transition-colors duration-300; }
</style>
