import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { Ingredient, IngredientType } from '~/types'

/**
 * Shared composable for ingredient data.
 * Uses TanStack Query's cache so multiple pages share the same data
 * without re-fetching (staleTime = 5 min set in plugin).
 */
export function useIngredients() {
  const {
    data: ingredients,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Ingredient[]>({
    queryKey: ['ingredients'],
    queryFn: getAllIngredients,
  })

  /**
   * Extract unique types with count + sample thumbnails.
   * null strType → "Other"
   */
  const types = computed<IngredientType[]>(() => {
    if (!ingredients.value) return []

    const map = new Map<string, { count: number; thumbs: string[] }>()

    ingredients.value.forEach((item) => {
      const typeName = item.strType || 'Other'

      if (!map.has(typeName)) {
        map.set(typeName, { count: 0, thumbs: [] })
      }

      const entry = map.get(typeName)!
      entry.count++
      // Collect up to 4 thumbnails as samples
      if (entry.thumbs.length < 4) {
        entry.thumbs.push(item.strThumb)
      }
    })

    const result: IngredientType[] = []
    map.forEach((value, key) => {
      result.push({
        name: key,
        count: value.count,
        sampleThumbs: value.thumbs,
      })
    })

    // Sort alphabetically, "Other" at the end
    return result.sort((a, b) => {
      if (a.name === 'Other') return 1
      if (b.name === 'Other') return -1
      return a.name.localeCompare(b.name)
    })
  })

  /**
   * Get all ingredients for a specific type.
   * Pass "Other" to get ingredients with null strType.
   */
  function getIngredientsByType(typeName: string): Ingredient[] {
    if (!ingredients.value) return []

    return ingredients.value.filter((item) => {
      const itemType = item.strType || 'Other'
      return itemType === typeName
    })
  }

  return {
    ingredients,
    types,
    isLoading,
    isError,
    error,
    refetch,
    getIngredientsByType,
  }
}
