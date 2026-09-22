<script setup lang="ts">
import { siInstagram, siWhatsapp } from 'simple-icons'
import BrandIcon from '@/components/ui/BrandIcon.vue'
import { INSTAGRAM_URL } from '@/config/site'
import { whatsappLink } from '@/utils/whatsapp'

const buttons = [
  { id: 'wa', href: whatsappLink(), label: 'Escríbenos por WhatsApp', icon: siWhatsapp, cls: 'bg-whatsapp hover:bg-[#1b6b3d]' },
  { id: 'ig', href: INSTAGRAM_URL, label: 'Síguenos en Instagram', icon: siInstagram, cls: 'bg-ink/80 hover:bg-ink/95' },
]
</script>

<template>
  <div class="fixed right-[calc(16px+env(safe-area-inset-right))] bottom-[calc(16px+env(safe-area-inset-bottom))] z-[55] flex flex-col gap-2.5 md:right-7 md:bottom-7">
    <a
      v-for="(b, i) in buttons" :key="b.id" :href="b.href" target="_blank" rel="noopener" :aria-label="b.label"
      class="group relative grid size-13 animate-[fabIn_.9s_var(--ease-premium)_both] place-items-center rounded-full text-white shadow-[0_10px_30px_rgba(0,0,0,.22),inset_0_0_0_1px_rgba(255,255,255,.12)] backdrop-blur-md transition duration-400 ease-premium hover:-translate-y-0.5 hover:!text-white"
      :class="b.cls" :style="{ animationDelay: `${i * 120}ms` }"
    >
      <BrandIcon :icon="b.icon" :size="24" />
      <!-- Tooltip: sólo dispositivos con hover -->
      <span class="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 translate-x-1.5 rounded-full bg-ink px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap text-on-dark opacity-0 transition duration-250 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100">
        {{ b.label }}
      </span>
    </a>
  </div>
</template>

<style>
@keyframes fabIn { from { opacity: 0; transform: translateY(12px) scale(.9); } }
</style>
