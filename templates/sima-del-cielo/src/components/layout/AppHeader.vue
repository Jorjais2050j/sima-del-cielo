<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu as MenuIcon, X } from 'lucide-vue-next'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_ITEMS, PHONE_DISPLAY } from '@/config/site'
import { whatsappLink } from '@/utils/whatsapp'
import { useScrollLock } from '@/composables/useScrollLock'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)
useScrollLock(open)

// Transparente sólo sobre el hero de la home.
const solid = computed(() => route.name !== 'home' || scrolled.value)
const onScroll = () => { scrolled.value = window.scrollY > window.innerHeight - 80 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { open.value = false })
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 h-[68px] transition-[background,color,box-shadow] duration-500 ease-premium"
    :class="solid ? 'bg-bg/80 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150' : 'text-white'"
  >
    <div class="container-page flex h-full items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex h-[52px] items-center" aria-label="Sima del Cielo — inicio">
        <img :src="solid ? '/brand/logo-green.png' : '/brand/logo-white.png'" alt="Sima del Cielo" width="865" height="721" class="h-12 w-auto" />
      </RouterLink>
      <nav class="hidden gap-9 text-sm font-medium md:flex" aria-label="Principal">
        <RouterLink v-for="item in NAV_ITEMS" :key="item.hash" :to="{ name: 'home', hash: item.hash }" class="py-2 opacity-90 hover:!text-current hover:opacity-100">
          {{ item.label }}
        </RouterLink>
      </nav>
      <button class="-mr-2.5 grid size-11 place-items-center md:hidden" aria-label="Abrir menú" :aria-expanded="open" aria-controls="mobile-menu" @click="open = true">
        <MenuIcon :size="22" />
      </button>
    </div>
  </header>

  <!-- Menú móvil a pantalla completa -->
  <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity duration-400" leave-active-class="transition-opacity duration-300">
    <div v-if="open" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú" class="fixed inset-0 z-[60] flex flex-col bg-deep px-5 pb-[calc(32px+env(safe-area-inset-bottom))] text-on-dark" @keydown="onKey">
      <div class="flex h-[68px] items-center justify-between">
        <img src="/brand/logo-white.png" alt="Sima del Cielo" class="h-12 w-auto" />
        <button class="-mr-2.5 grid size-11 place-items-center" aria-label="Cerrar menú" autofocus @click="open = false"><X :size="22" /></button>
      </div>
      <nav class="mt-[8vh] flex flex-col gap-1.5">
        <RouterLink v-for="item in NAV_ITEMS" :key="item.hash" :to="{ name: 'home', hash: item.hash }" class="font-serif text-[clamp(44px,12vw,64px)] leading-[1.1] font-light tracking-tight hover:!text-on-dark-2" @click="open = false">
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="mt-auto flex flex-col gap-1.5 text-[15px] text-on-dark-2">
        <a :href="whatsappLink()" target="_blank" rel="noopener">WhatsApp · {{ PHONE_DISPLAY }}</a>
        <a :href="INSTAGRAM_URL" target="_blank" rel="noopener">Instagram · {{ INSTAGRAM_HANDLE }}</a>
      </div>
    </div>
  </Transition>
</template>
