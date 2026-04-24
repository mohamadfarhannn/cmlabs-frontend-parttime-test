<script setup lang="ts">
defineProps<{
  message?: string
  icon?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
    <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <Icon :name="icon || 'lucide:search-x'" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-lg font-semibold text-gray-700 mb-1">No results found</h3>
    <p class="text-sm text-gray-400 max-w-sm">
      {{ message || 'Try adjusting your search or explore a different category.' }}
    </p>
  </div>
</template>
