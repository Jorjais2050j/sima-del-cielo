<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import type { GalleryImage } from '@/types/models'
import { useScrollLock } from '@/composables/useScrollLock'
import { imageUrl } from '@/utils/image'

const props = defineProps<{ images: GalleryImage[] }>()
const index = defineModel<number | null>('index', { required: true })
const open = computed(() => index.value !== null)
const current = computed(() => (index.value !== null ? props.images[index.value] : undefined))
const closeBtn = ref<HTMLButtonElement>()
let lastFocus: HTMLElement | null = null
useScrollLock(open)

watch(open, async (o) => {
  if (o) { lastFocus = document.activeElement as HTMLElement; await nextTick(); closeBtn.value?.focus() }
  else lastFocus?.focus()
})
const go = (d: 1 | -1) => { if (index.value !== null) index.value = (index.value + d + props.images.length) % props.images.length }
const close = () => { index.value = null }
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
}
let tx = 0
const onTouchStart = (e: TouchEvent) => { tx = e.touches[0]?.clientX ?? 0 }
const onTouchEnd = (e: TouchEvent) => { const d = (e.changedTouches[0]?.clientX ?? 0) - tx; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }
</script>

<template>
  <Teleport to="body">
    <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300">
      <div
        v-if="open && current" class="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,12,7,.96)]"
        role="dialog" aria-modal="true" aria-label="Galería" tabindex="-1"
        @keydown="onKey" @click.self="close" @touchstart.passive="onTouchStart" @touchend="onTouchEnd"
      >
        <Transition mode="out-in" enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity duration-250" leave-active-class="transition-opacity duration-150">
          <img :key="current.id" :src="imageUrl(current.src, 1920)" :alt="current.alt" class="max-h-[80vh] max-w-[92vw] rounded-lg object-contain" />
        </Transition>
        <button ref="closeBtn" class="lb-btn top-[calc(16px+env(safe-area-inset-top))] right-4" aria-label="Cerrar" @click="close"><X :size="20" /></button>
        <button class="lb-btn bottom-[calc(56px+env(safe-area-inset-bottom))] left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2" aria-label="Anterior" @click="go(-1)"><ChevronLeft :size="20" /></button>
        <button class="lb-btn right-4 bottom-[calc(56px+env(safe-area-inset-bottom))] sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2" aria-label="Siguiente" @click="go(1)"><ChevronRight :size="20" /></button>
        <div class="absolute inset-x-0 bottom-[calc(20px+env(safe-area-inset-bottom))] text-center text-sm text-white/75">{{ current.alt }} — {{ (index ?? 0) + 1 }} / {{ images.length }}</div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/styles/main.css";
.lb-btn { @apply absolute grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20; }
</style>
