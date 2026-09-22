<script setup lang="ts" generic="T extends string">
defineProps<{ options: readonly { value: T; label: string }[]; label: string; dark?: boolean }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 py-0.5 md:mx-0 md:px-0.5" role="group" :aria-label="label">
    <button
      v-for="o in options" :key="o.value" type="button" :aria-pressed="model === o.value"
      class="h-10 flex-none rounded-full border px-4.5 text-sm font-medium transition duration-300 ease-premium"
      :class="dark
        ? (model === o.value ? 'border-on-dark bg-on-dark text-ink' : 'border-line-dark text-on-dark-2 hover:text-on-dark')
        : (model === o.value ? 'border-ink bg-ink text-on-dark' : 'border-line text-ink-2 hover:text-ink')"
      @click="model = o.value"
    >
      {{ o.label }}
    </button>
  </div>
</template>
