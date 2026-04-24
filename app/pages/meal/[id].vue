<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { MealDetail } from '~/types'
import { parseMealIngredients } from '~/types'

const route = useRoute()
const mealId = computed(() => route.params.id as string)

const { data: meal, isLoading, isError, refetch } = useQuery<MealDetail | null>({
  queryKey: ['meal-detail', mealId],
  queryFn: () => getMealDetail(mealId.value),
})

// Parse ingredients + measures
const recipeIngredients = computed(() =>
  meal.value ? parseMealIngredients(meal.value) : []
)

// Parse tags
const tags = computed(() =>
  meal.value?.strTags
    ? meal.value.strTags.split(',').map((t) => t.trim()).filter(Boolean)
    : []
)

// Split instructions into paragraphs for better readability
const instructionParagraphs = computed(() =>
  meal.value?.strInstructions
    ? meal.value.strInstructions.split(/\r?\n/).filter((p) => p.trim())
    : []
)

// Dynamic head
useHead({
  title: () => meal.value ? `${meal.value.strMeal} — Foodie Library` : 'Meal Detail — Foodie Library',
  meta: [
    {
      name: 'description',
      content: () => meal.value
        ? `Learn how to cook ${meal.value.strMeal}. ${meal.value.strCategory} recipe from ${meal.value.strArea}.`
        : 'View meal details and recipe.',
    },
  ],
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-32">
      <AtomsLoadingSpinner size="lg" class="text-brand-500" />
    </div>

    <!-- Error -->
    <AtomsErrorState v-else-if="isError" :retry-fn="() => refetch()" />

    <!-- Not found -->
    <AtomsEmptyState
      v-else-if="!meal"
      message="This meal could not be found."
      icon="lucide:utensils-crossed"
    />

    <!-- Meal Detail -->
    <template v-else>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <AtomsBreadcrumbs
          :items="[
            { label: 'Home', to: '/' },
            { label: meal.strCategory, to: `/type/${encodeURIComponent(meal.strCategory)}` },
            { label: meal.strMeal }
          ]"
        />
      </div>
      <!-- Hero Image -->
      <div class="relative h-64 sm:h-80 md:h-[28rem] overflow-hidden">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <!-- Back button overlay -->
        <div class="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <button
            @click="$router.back()"
            class="flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-md text-white text-sm rounded-xl hover:bg-black/60 transition-colors"
          >
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Back
          </button>
        </div>

        <!-- Title overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
          <div class="max-w-6xl mx-auto">
            <div class="flex flex-wrap gap-2 mb-3">
              <AtomsBadge :label="meal.strCategory" variant="orange" />
              <AtomsBadge :label="meal.strArea" variant="blue" />
              <AtomsBadge v-for="tag in tags" :key="tag" :label="tag" variant="default" />
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {{ meal.strMeal }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Left: Instructions -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Instructions -->
            <section>
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:book-open" class="w-5 h-5 text-brand-500" />
                Instructions
              </h2>
              <div class="prose prose-gray max-w-none space-y-3">
                <p
                  v-for="(paragraph, i) in instructionParagraphs"
                  :key="i"
                  class="text-gray-600 leading-relaxed text-sm sm:text-base"
                >
                  {{ paragraph }}
                </p>
              </div>
            </section>

            <!-- YouTube -->
            <section v-if="meal.strYoutube">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:youtube" class="w-5 h-5 text-red-500" />
                Video Tutorial
              </h2>
              <AtomsYouTubeEmbed :url="meal.strYoutube" />
            </section>

            <!-- Source -->
            <a
              v-if="meal.strSource"
              :href="meal.strSource"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              <Icon name="lucide:external-link" class="w-4 h-4" />
              View Original Source
            </a>
          </div>

          <!-- Right: Recipe sidebar -->
          <aside>
            <div class="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:scroll-text" class="w-5 h-5 text-brand-500" />
                Recipe
                <span class="text-xs font-normal text-gray-400 ml-auto">
                  {{ recipeIngredients.length }} items
                </span>
              </h2>
              <MoleculesRecipeList :ingredients="recipeIngredients" />
            </div>
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>
