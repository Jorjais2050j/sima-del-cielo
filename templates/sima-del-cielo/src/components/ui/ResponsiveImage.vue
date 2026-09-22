<script setup lang="ts">
import { computed } from 'vue'
import type { Media } from '@/types/models'
import { imageSrcset, imageUrl } from '@/utils/image'

const props = withDefaults(defineProps<{ media: Media; sizes?: string; priority?: boolean }>(), {
  sizes: '100vw',
  priority: false,
})
const src = computed(() => imageUrl(props.media.src, 1440))
const srcset = computed(() => imageSrcset(props.media.src))
</script>

<template>
  <!-- width/height reservan el espacio → evita CLS. priority = LCP (hero). -->
  <img
    :src="src" :srcset="srcset" :sizes="srcset ? sizes : undefined" :alt="media.alt"
    :width="media.width" :height="media.height"
    :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" decoding="async"
  />
</template>
