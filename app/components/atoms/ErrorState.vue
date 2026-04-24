<script setup lang="ts">
defineProps<{
  message?: string
  retryFn?: () => void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
    <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
      <Icon name="lucide:alert-triangle" class="w-8 h-8 text-red-500" />
    </div>
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
    <p class="text-sm text-gray-500 max-w-md mb-6">
      {{ message || 'Failed to load data. Please check your connection and try again.' }}
    </p>
    <button
      v-if="retryFn"
      @click="retryFn"
      class="px-5 py-2.5 bg-brand-500 text-white text-sm font-medium rounded-xl hover:bg-brand-600 transition-colors shadow-sm hover:shadow-md"
    >
      Try Again
    </button>
  </div>
</template>
