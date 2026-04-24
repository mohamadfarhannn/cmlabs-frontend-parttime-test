<script setup lang="ts">
import type { RecipeIngredient } from '~/types'

defineProps<{
  ingredients: RecipeIngredient[]
}>()
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="(item, index) in ingredients"
      :key="index"
      class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-brand-50/50 transition-colors group"
    >
      <!-- Index circle -->
      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold group-hover:bg-brand-200 transition-colors">
        {{ index + 1 }}
      </div>

      <!-- Ingredient thumbnail (small) -->
      <img
        :src="`https://www.themealdb.com/images/ingredients/${encodeURIComponent(item.name)}-Small.png`"
        :alt="item.name"
        class="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-white"
        loading="lazy"
      />

      <!-- Name & measure -->
      <div class="flex-1 min-w-0">
        <span class="text-sm font-medium text-gray-800">{{ item.name }}</span>
      </div>
      <span class="text-sm text-gray-500 flex-shrink-0 font-mono">{{ item.measure }}</span>
    </div>
  </div>
</template>
