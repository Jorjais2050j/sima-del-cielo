<script setup lang="ts">
defineProps<{ icon: { path: string; title: string }; size?: number }>()
</script>

<template>
  <svg :width="size ?? 24" :height="size ?? 24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="icon.path" /></svg>
</template>
