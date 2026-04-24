<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>

<template>
  <nav class="flex items-center gap-2 text-sm text-gray-500 mb-6">
    <template v-for="(item, i) in items" :key="i">
      <Icon
        v-if="i > 0"
        name="lucide:chevron-right"
        class="w-4 h-4 text-gray-300 flex-shrink-0"
      />
      
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="hover:text-brand-600 transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="font-medium text-gray-900 truncate">
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
