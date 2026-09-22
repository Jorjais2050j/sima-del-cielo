<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
withDefaults(defineProps<{ to?: RouteLocationRaw; href?: string; variant?: 'light' | 'ghost-light' | 'dark' }>(), { variant: 'dark' })
const styles = {
  light: 'bg-on-dark text-ink hover:bg-white hover:!text-ink',
  'ghost-light': 'border border-white/45 text-white hover:bg-white/12 hover:!text-white',
  dark: 'bg-ink text-on-dark hover:bg-forest hover:!text-white',
}
</script>

<template>
  <component
    :is="to ? 'RouterLink' : href ? 'a' : 'button'" :to="to" :href="href"
    :target="href?.startsWith('http') ? '_blank' : undefined" :rel="href?.startsWith('http') ? 'noopener' : undefined"
    class="inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[15px] font-medium transition duration-300 ease-premium active:scale-[.97]"
    :class="styles[variant]"
  >
    <slot />
  </component>
</template>
