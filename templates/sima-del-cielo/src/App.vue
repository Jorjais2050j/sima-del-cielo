<script setup lang="ts">
import { MotionConfig } from 'motion-v'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <!-- reducedMotion="user": respeta prefers-reduced-motion en todas las animaciones -->
  <MotionConfig reduced-motion="user">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </MotionConfig>
</template>
