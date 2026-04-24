// ============================================
// TheMealDB API Response Types
// ============================================

/** Raw ingredient from list.php?i=list */
export interface Ingredient {
  idIngredient: string
  strIngredient: string
  strDescription: string | null
  strThumb: string
  strType: string | null
}

/** Processed type category (extracted from ingredients) */
export interface IngredientType {
  name: string
  count: number
  /** Sample thumbnail from the first ingredient in this type */
  sampleThumbs: string[]
}

/** Meal preview from filter.php?i={ingredient} */
export interface MealPreview {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

/** Full meal detail from lookup.php?i={id} */
export interface MealDetail {
  idMeal: string
  strMeal: string
  strMealAlternate: string | null
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string | null
  strSource: string | null
  // Ingredient/Measure pairs (1-20)
  [key: `strIngredient${number}`]: string | null
  [key: `strMeasure${number}`]: string | null
}

/** Parsed ingredient + measure pair for RecipeList */
export interface RecipeIngredient {
  name: string
  measure: string
}

/**
 * Parse strIngredient1..20 & strMeasure1..20 into a clean array.
 * Filters out empty/null entries.
 */
export function parseMealIngredients(meal: MealDetail): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = []

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}` as keyof MealDetail] as string | null
    const measure = meal[`strMeasure${i}` as keyof MealDetail] as string | null

    if (name && name.trim() !== '') {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || '',
      })
    }
  }

  return ingredients
}
