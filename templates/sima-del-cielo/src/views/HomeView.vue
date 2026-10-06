<script setup lang="ts">
import { site } from '@/config/site'
import { whatsappLink } from '@/utils/whatsapp'
import HeroVideo from '@/components/home/HeroVideo.vue'
import IntroStatement from '@/components/home/IntroStatement.vue'
import PackagesSection from '@/components/packages/PackagesSection.vue'
import CabinsSection from '@/components/cabins/CabinsSection.vue'
import MenuSection from '@/components/menu/MenuSection.vue'
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <HeroVideo :poster="site.hero.poster" :sources="site.hero.video.sources" :loop-end="site.hero.video.loopEnd">
    <div class="eyebrow !text-white/80">{{ site.location.locality }}, {{ site.location.region }}</div>
    <!-- nombre y tagline con la misma tipografía (Hanken light, sin cursiva); el nombre cabe en una línea en móvil -->
    <h1 class="font-serif text-[clamp(40px,6.5vw_+_22px,144px)] leading-[.86] font-light tracking-[-.045em]">
      <span class="whitespace-nowrap">{{ site.business.name }}</span>
      <span class="mt-[.3em] block text-[length:max(12px,.25em)] tracking-[-.01em] text-white/88">{{ site.business.tagline }}</span>
    </h1>
    <!-- CTA: preparado para "Reservar" (Fase 2) sin cambiar el layout -->
    <div class="flex flex-wrap gap-3">
      <BaseButton :to="{ hash: '#paquetes' }" variant="light">Ver paquetes</BaseButton>
      <BaseButton :href="whatsappLink()" variant="ghost-light">Escríbenos</BaseButton>
    </div>
  </HeroVideo>
  <!-- Oculta a petición del cliente: cambiar v-if a true para volver a mostrarla -->
  <IntroStatement v-if="false" eyebrow="Parque ecoturístico" :text="site.business.summary" :image="site.intro.image" />
  <PackagesSection />
  <CabinsSection />
  <MenuSection />
  <GalleryGrid />
  <ContactSection />
</template>
