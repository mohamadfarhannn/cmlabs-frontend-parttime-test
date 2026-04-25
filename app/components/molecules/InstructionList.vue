<script setup lang="ts">
defineProps<{
  steps: string[]
}>()
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-brand-200 transition-all duration-300 group shadow-sm"
    >
      <!-- Step number -->
      <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
        {{ index + 1 }}
      </div>

      <!-- Step text -->
      <div class="flex-1 pt-1">
        <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
          {{ step }}
        </p>
      </div>
    </div>
  </div>
</template>
