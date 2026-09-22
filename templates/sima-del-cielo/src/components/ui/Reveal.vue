<script setup lang="ts">
import { motion } from 'motion-v'
withDefaults(defineProps<{ delay?: number; y?: number }>(), { delay: 0, y: 28 })
</script>

<template>
  <!-- Entrada suave al entrar en viewport, una sola vez. Motion respeta prefers-reduced-motion (MotionConfig). -->
  <motion.div
    :initial="{ opacity: 0, y }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, margin: '0px 0px -8% 0px' }"
    :transition="{ duration: 1, delay, ease: [0.2, 0.7, 0.2, 1] }"
  >
    <slot />
  </motion.div>
</template>
