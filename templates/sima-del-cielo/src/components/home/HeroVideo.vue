<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { SiteContent } from '@/types/models'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

/**
 * Hero a pantalla completa.
 * - El video se renderiza de inmediato (sin espera a onMounted) para que arranque sin parpadeo.
 * - Fuente distinta para móvil/escritorio (media: 'mobile' | 'desktop').
 * - Se pausa fuera de pantalla. Si no hay video (o Save-Data activo), se usa el póster.
 * - loopEnd: regresa al inicio antes de ese segundo (el video original cierra en blanco).
 */
const props = defineProps<{
  poster: SiteContent['hero']['poster']
  sources: SiteContent['hero']['video']['sources']
  loopEnd?: number
}>()

const root = ref<HTMLElement>()
const video = ref<HTMLVideoElement>()
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
const activeSources = computed(() => {
  if (!props.sources.length || saveData) return []
  const mobile = matchMedia('(max-width: 767px)').matches
  return props.sources.filter((s) => !s.media || (s.media === 'mobile') === mobile)
})
let io: IntersectionObserver | undefined
onMounted(() => {
  io = new IntersectionObserver(([e]) => (e?.isIntersecting ? video.value?.play().catch(() => {}) : video.value?.pause()))
  if (root.value) io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
function onTimeUpdate() {
  if (props.loopEnd && video.value && video.value.currentTime >= props.loopEnd) video.value.currentTime = 0
}
</script>

<template>
  <section ref="root" class="relative h-svh min-h-[560px] overflow-hidden bg-deep text-white" aria-label="Sima del Cielo">
    <div class="absolute inset-0">
      <video
        v-if="activeSources.length" ref="video" class="absolute inset-0 size-full object-cover brightness-110 contrast-105 saturate-130"
        muted loop playsinline autoplay preload="auto" poster="/media/video/hero-poster.jpg" aria-hidden="true"
        @timeupdate="onTimeUpdate"
      >
        <source v-for="s in activeSources" :key="s.src" :src="s.src" :type="s.type" />
      </video>
      <ResponsiveImage v-else :media="poster" priority class="absolute inset-0 size-full object-cover" />
    </div>
    <!-- degradado ligero: oscurece sólo arriba (menú) y abajo (texto) para que el video luzca -->
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,9,.3)_0%,rgba(10,16,9,0)_20%,rgba(10,16,9,0)_55%,rgba(10,16,9,.65)_100%)]" />
    <div class="absolute inset-x-0 bottom-0 z-10 pb-[calc(clamp(40px,8vh,88px)+env(safe-area-inset-bottom))]">
      <div class="container-page grid gap-7"><slot /></div>
    </div>
  </section>
</template>

<style>
@keyframes heroIn { from { transform: scale(1.08); opacity: .4; } to { transform: none; opacity: 1; } }
</style>
