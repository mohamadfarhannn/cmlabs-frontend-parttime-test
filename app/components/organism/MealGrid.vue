<script setup lang="ts">
import type { MealPreview } from '~/types'

defineProps<{
  meals: MealPreview[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    <AtomsMealCard
      v-for="(meal, index) in meals"
      :key="meal.idMeal"
      :id="meal.idMeal"
      :name="meal.strMeal"
      :thumbnail="meal.strMealThumb"
      class="animate-fade-in-up"
      :style="{ animationDelay: `${index * 40}ms` }"
    />
  </div>
</template>
