<script setup lang="ts">
import { ref } from 'vue'
import { getGallery } from '@/services/catalog.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import GalleryLightbox from './GalleryLightbox.vue'

const { data: images } = useAsyncData(getGallery)
const openAt = ref<number | null>(null)
</script>

<template>
  <section id="galeria" class="py-[clamp(80px,10vw,160px)]">
    <div class="container-page">
      <SectionTitle eyebrow="Galería" title="Sima del Cielo" tone="cielo" />
      <!-- Masonry con CSS columns: sin JS de layout, sin CLS (width/height en cada imagen) -->
      <div class="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        <button
          v-for="(img, i) in images ?? []" :key="img.id" type="button" :aria-label="`Ampliar: ${img.alt}`"
          class="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-[14px] bg-surface md:mb-4" @click="openAt = i"
        >
          <ResponsiveImage :media="img" sizes="(min-width:1200px) 25vw, (min-width:760px) 33vw, 50vw" class="h-auto w-full transition-transform duration-1000 ease-premium group-hover:scale-[1.035]" />
        </button>
      </div>
    </div>
    <GalleryLightbox v-if="images" v-model:index="openAt" :images="images" />
  </section>
</template>
