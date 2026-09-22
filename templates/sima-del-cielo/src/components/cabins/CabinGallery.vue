<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Media } from '@/types/models'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

const props = defineProps<{ images: Media[]; label: string }>()
const track = ref<HTMLElement>()
const index = ref(0)
const go = (dir: 1 | -1) => track.value?.scrollBy({ left: track.value.clientWidth * dir, behavior: 'smooth' })
const onScroll = () => { if (track.value) index.value = Math.round(track.value.scrollLeft / track.value.clientWidth) }
</script>

<template>
  <div class="relative overflow-hidden rounded-card bg-[#d9d4c8]">
    <div ref="track" class="no-scrollbar flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto" tabindex="0" :aria-label="`Fotografías de ${label}`" @scroll.passive="onScroll">
      <ResponsiveImage v-for="m in props.images" :key="m.src" :media="m" sizes="(min-width:1024px) 60vw, 100vw" class="size-full flex-none snap-center object-cover" />
    </div>
    <div class="absolute bottom-7.5 left-5 flex gap-1.5" aria-hidden="true">
      <i v-for="(_, i) in images" :key="i" class="h-1.5 rounded-full transition-all duration-300" :class="i === index ? 'w-4.5 bg-white' : 'w-1.5 bg-white/50'" />
    </div>
    <div class="absolute right-4 bottom-4 flex gap-2">
      <button class="nav" aria-label="Foto anterior" @click="go(-1)"><ChevronLeft :size="18" /></button>
      <button class="nav" aria-label="Foto siguiente" @click="go(1)"><ChevronRight :size="18" /></button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/styles/main.css";
.nav { @apply grid size-11 place-items-center rounded-full bg-bg/90 backdrop-blur-sm transition-colors hover:bg-white; }
</style>
