<script setup lang="ts">
import type { MenuItem } from '@/types/models'
import { formatMoney } from '@/utils/format'

/** Fase de carrito: añadir aquí un botón "Agregar" que emita @add sin cambiar el layout. */
defineProps<{ item: MenuItem }>()
</script>

<template>
  <div class="border-t border-line-dark py-3">
    <div class="flex justify-between gap-4 text-[15.5px] font-medium">
      <span>{{ item.name }}</span>
      <span class="whitespace-nowrap tabular-nums">
        <template v-if="item.variants">{{ item.variants.map((v) => `${v.label} ${formatMoney(v.price)}`).join(' · ') }}</template>
        <template v-else-if="item.price != null">{{ formatMoney(item.price) }}</template>
        <span v-else class="font-normal text-on-dark-2">Consultar</span>
      </span>
    </div>
    <p v-if="item.description" class="mt-1 text-sm leading-normal text-on-dark-2">{{ item.description }}</p>
    <p v-if="item.addons" class="mt-1 text-sm text-on-dark-2">Extra: {{ item.addons.map((a) => `${a.label} ${formatMoney(a.price)}`).join(' · ') }}</p>
  </div>
</template>
