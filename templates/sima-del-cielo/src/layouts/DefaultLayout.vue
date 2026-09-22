<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FloatingSocialButtons from '@/components/social/FloatingSocialButtons.vue'
</script>

<template>
  <AppHeader />
  <main id="top"><slot /></main>
  <AppFooter />
  <FloatingSocialButtons />
</template>
