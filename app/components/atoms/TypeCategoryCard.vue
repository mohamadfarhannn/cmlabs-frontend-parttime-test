<script setup lang="ts">
import type { IngredientType } from '~/types'

defineProps<{
  type: IngredientType
}>()
</script>

<template>
  <NuxtLink
    :to="`/type/${encodeURIComponent(type.name)}`"
    class="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Thumbnail mosaic -->
    <div class="relative h-36 bg-gradient-to-br from-brand-50 to-orange-50 overflow-hidden">
      <div class="grid grid-cols-2 gap-0.5 w-full h-full">
        <div
          v-for="(thumb, i) in type.sampleThumbs.slice(0, 4)"
          :key="i"
          class="overflow-hidden"
        >
          <img
            :src="thumb"
            :alt="`${type.name} sample`"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <!-- Fill remaining slots with gradient placeholder -->
        <div
          v-for="n in Math.max(0, 4 - type.sampleThumbs.length)"
          :key="'empty-' + n"
          class="bg-gradient-to-br from-brand-100 to-brand-200"
        />
      </div>
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-bold text-gray-800 group-hover:text-brand-600 transition-colors text-lg">
        {{ type.name }}
      </h3>
      <div class="flex items-center gap-2 mt-1.5">
        <Icon name="lucide:package" class="w-3.5 h-3.5 text-gray-400" />
        <span class="text-sm text-gray-500">{{ type.count }} ingredient{{ type.count !== 1 ? 's' : '' }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
