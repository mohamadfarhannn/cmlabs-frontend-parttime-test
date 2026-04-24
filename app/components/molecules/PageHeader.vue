<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-8">
    <!-- Back button slot -->
    <div v-if="$slots.back" class="mb-4">
      <slot name="back" />
    </div>

    <!-- Title & subtitle -->
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-2 text-gray-500 text-sm sm:text-base max-w-xl">
          {{ subtitle }}
        </p>
      </div>

      <!-- Optional extra slot (e.g., count badge) -->
      <div v-if="$slots.extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- Search slot -->
    <div v-if="$slots.search">
      <slot name="search" />
    </div>
  </div>
</template>
