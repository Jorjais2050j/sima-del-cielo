<script setup lang="ts">
import type { MenuCategory } from '@/types/models'
import MenuItemRow from './MenuItemRow.vue'
defineProps<{ category: MenuCategory }>()
</script>

<template>
  <div class="mb-12 break-inside-avoid">
    <h3 class="mb-1.5 font-serif text-[28px] leading-tight">{{ category.name }}</h3>
    <p v-if="category.description" class="mb-3 text-sm text-on-dark-2 italic">{{ category.description }}</p>
    <MenuItemRow v-for="it in category.items" :key="it.id" :item="it" />
  </div>
</template>
