<script setup lang="ts">
import type { Ingredient } from '~/types'

defineProps<{
  ingredients: Ingredient[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <AtomsIngredientCard
      v-for="(item, index) in ingredients"
      :key="item.idIngredient"
      :name="item.strIngredient"
      :thumbnail="item.strThumb"
      :description="item.strDescription || 'No description available for this ingredient.'"
      class="animate-fade-in-up"
      :style="{ animationDelay: `${index * 30}ms` }"
    />
  </div>
</template>
