<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getMenu } from '@/services/catalog.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SegmentedControl from '@/components/ui/SegmentedControl.vue'
import MenuCard from './MenuCard.vue'

const { data: menu } = useAsyncData(getMenu)
const group = ref('cocina')
const groups = computed(() => (menu.value?.groups ?? []).map((g) => ({ value: g.id, label: g.name })))
const categories = computed(() => (menu.value?.categories ?? []).filter((c) => c.group === group.value))
watchEffect(() => { if (menu.value && !menu.value.groups.some((g) => g.id === group.value)) group.value = menu.value.groups[0]!.id })

const aside = [
  { src: '/media/packages/senderos-am-2.jpg', alt: 'Chilaquiles con huevo', width: 501, height: 502 },
  { src: '/media/packages/senderos-pm-2.jpg', alt: 'Cochito horneado', width: 513, height: 514 },
]
</script>

<template>
  <section id="menu" class="bg-deep py-[clamp(80px,10vw,160px)] text-on-dark">
    <div class="container-page">
      <SectionTitle title="Restaurante" tone="maiz" dark>
        <SegmentedControl v-model="group" :options="groups" label="Sección del menú" dark />
      </SectionTitle>
      <div class="grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <div class="grid grid-cols-2 gap-3 self-start lg:sticky lg:top-24 lg:grid-cols-1 lg:gap-4">
          <img v-for="(m, i) in aside" :key="m.src" v-bind="m" loading="lazy" class="w-full rounded-card object-cover" :class="i === 0 ? 'aspect-square lg:aspect-[4/5]' : 'aspect-square'" />
        </div>
        <div class="columns-1 gap-16 md:columns-2">
          <MenuCard v-for="c in categories" :key="c.id" :category="c" />
        </div>
      </div>
    </div>
  </section>
</template>
