<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="container-page grid min-h-[70vh] content-center gap-6 pt-[68px]">
    <div class="eyebrow">Error 404</div>
    <h1 class="font-serif text-[clamp(44px,7vw,104px)] leading-[.95] font-light">Página no encontrada</h1>
    <BaseButton :to="{ name: 'home' }" class="self-start">Volver al inicio</BaseButton>
  </section>
</template>
