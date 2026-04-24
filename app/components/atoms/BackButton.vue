<script setup lang="ts">
defineProps<{
  to: string
  label?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors group"
  >
    <div class="p-1.5 rounded-lg bg-gray-100 group-hover:bg-brand-50 transition-colors">
      <Icon name="lucide:arrow-left" class="w-4 h-4" />
    </div>
    <span>{{ label || 'Back' }}</span>
  </NuxtLink>
</template>
