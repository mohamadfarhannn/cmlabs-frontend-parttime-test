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

// Split instructions into paragraphs and clean up special characters
const instructionParagraphs = computed(() => {
  if (!meal.value?.strInstructions) return []

  const cleanedText = meal.value.strInstructions.replace(/\u25a2/g, '\n')
  
  return cleanedText
    .split(/\r?\n/)
    .map(p => p.trim())
    .filter(p => {
      const isMeaningless = p.length === 0 || /^[\s\u25a2\t\r\n]+$/.test(p) || /^\d+$/.test(p)
      return !isMeaningless
    })

    .map(p => p.replace(/^\s*(Step\s+)?(\d+)(\.|\:|\))\s*/i, ''))
    .filter(p => p.length > 0)
})

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
    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="animate-pulse">
      <!-- Hero Image Skeleton -->
      <div class="relative h-64 sm:h-80 md:h-[28rem] bg-gray-200">
        <!-- Top Skeleton Overlay -->
        <div class="absolute top-0 left-0 right-0 p-6 sm:p-8">
          <div class="max-w-6xl mx-auto">
            <div class="h-4 bg-gray-300/50 rounded w-48 mb-6"></div>
            <div class="h-10 bg-gray-300/50 rounded-xl w-24"></div>
          </div>
        </div>

        <!-- Bottom Skeleton Overlay -->
        <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 w-full">
          <div class="max-w-6xl mx-auto">
            <div class="flex gap-2 mb-3">
              <div class="h-6 bg-gray-300 rounded-full w-20"></div>
              <div class="h-6 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div class="h-10 bg-gray-300 rounded w-3/4 max-w-lg"></div>
          </div>
        </div>
      </div>

      <!-- Content Skeleton -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Left: Instructions Skeleton -->
          <div class="lg:col-span-2 space-y-8">
            <div class="space-y-4">
              <div class="h-6 bg-gray-200 rounded w-40 mb-6"></div>
              <div v-for="n in 6" :key="n" class="h-4 bg-gray-100 rounded w-full"></div>
              <div class="h-4 bg-gray-100 rounded w-4/5"></div>
            </div>
          </div>
          <!-- Right: Sidebar Skeleton -->
          <aside>
            <div class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-32"></div>
              <div v-for="n in 8" :key="n" class="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          </aside>
        </div>
      </div>
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
      <!-- Hero Image -->
      <div class="relative h-80 md:h-[28rem] overflow-hidden">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <!-- Top overlay -->
        <div class="absolute top-0 left-0 right-0 p-6 sm:p-8 z-10">
          <div class="max-w-6xl mx-auto">
            <AtomsBreadcrumbs
              class="text-white mb-0 backdrop-blur-md px-4 py-2 rounded-xl max-w-fit"
              :items="[
                { label: 'Home', to: '/' },
                { label: meal.strCategory, to: `/type/${encodeURIComponent(meal.strCategory)}` },
                { label: meal.strMeal }
              ]"
            />
            
            <div class="mt-4 sm:mt-6">
              <button
                @click="$router.back()"
                class="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm rounded-xl border border-white/20 transition-all duration-300"
              >
                <Icon name="lucide:arrow-left" class="w-4 h-4" />
                Back
              </button>
            </div>
          </div>
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
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Icon name="lucide:book-open" class="w-5 h-5 text-brand-500" />
                Step-by-Step Instructions
              </h2>
              <MoleculesInstructionList :steps="instructionParagraphs" />
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
