<script setup lang="ts">
import type { IngredientType } from "~/types";

defineProps<{
  types: IngredientType[];
  loading?: boolean;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    <template v-if="loading">
      <AtomsTypeCategoryCard v-for="n in 8" :key="'skeleton-' + n" loading />
    </template>
    <template v-else>
      <AtomsTypeCategoryCard v-for="(type, index) in types" :key="type.name" :type="type" class="animate-fade-in-up" :style="{ animationDelay: `${index * 50}ms` }" />
    </template>
  </div>
</template>
