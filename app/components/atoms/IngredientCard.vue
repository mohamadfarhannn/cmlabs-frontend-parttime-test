<script setup lang="ts">
defineProps<{
  name?: string
  thumbnail?: string
  description?: string | null
  loading?: boolean
}>()
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm animate-pulse"
  >
    <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-200" />
    <div class="flex-1 min-w-0">
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div class="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  </div>

  <NuxtLink 
    v-else-if="name"
    :to="`/ingredient/${encodeURIComponent(name)}`"
    class="group flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300 hover:-translate-y-0.5"
  >
    <!-- Thumbnail -->
    <div class="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-brand-50 group-hover:bg-brand-100 transition-colors">
      <img
        v-if="thumbnail"
        :src="thumbnail"
        :alt="name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon name="lucide:cooking-pot" class="w-6 h-6 text-brand-500" />
      </div>
    </div>

    <!-- Text -->
    <div class="flex-1 min-w-0">
      <span class="font-semibold text-gray-800 group-hover:text-brand-600 transition-colors block truncate">
        {{ name }}
      </span>
      <p v-if="description" class="text-xs text-gray-400 mt-0.5 line-clamp-1">
        {{ description }}
      </p>
    </div>

    <!-- Arrow -->
    <Icon
      name="lucide:chevron-right"
      class="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors flex-shrink-0"
    />
  </NuxtLink>
</template>
