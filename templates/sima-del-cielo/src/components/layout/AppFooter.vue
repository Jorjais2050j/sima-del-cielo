<script setup lang="ts">
import { site } from '@/config/site'
const year = new Date().getFullYear()
const links = [
  { label: 'Paquetes', hash: '#paquetes' }, { label: 'Cabañas', hash: '#cabanas' }, { label: 'Menú', hash: '#menu' },
  { label: 'Galería', hash: '#galeria' }, { label: 'Contacto', hash: '#contacto' },
]
</script>

<template>
  <!-- padding inferior extra: los botones flotantes nunca tapan el contenido final -->
  <footer class="bg-deep pt-18 pb-[calc(110px+env(safe-area-inset-bottom))] text-sm text-on-dark-2">
    <div class="container-page grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
      <img src="/brand/logo-white.png" alt="Sima del Cielo · Aventura Zoque" width="865" height="721" loading="lazy" class="h-21 w-auto" />
      <nav class="flex flex-wrap gap-x-7 gap-y-3 text-on-dark" aria-label="Pie de página">
        <RouterLink v-for="l in links" :key="l.hash" :to="{ name: 'home', hash: l.hash }">{{ l.label }}</RouterLink>
      </nav>
      <div class="flex flex-wrap justify-between gap-3 border-t border-line-dark pt-6 md:col-span-2">
        <span>© {{ year }} {{ site.business.name }} · {{ site.location.locality }}, {{ site.location.region }}</span>
        <span>{{ site.business.pricesNote }}</span>
      </div>
    </div>
  </footer>
</template>
