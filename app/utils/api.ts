import axios from 'axios'
import type { Ingredient, MealPreview, MealDetail } from '~/types'

// Fungsi untuk mengambil semua daftar ingredients
export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const config = useRuntimeConfig()
  const { data } = await axios.get(`${config.public.apiBaseUrl}/list.php?i=list`)
  return data.meals || []
}

// Fungsi untuk memfilter makanan berdasarkan satu ingredient
export const getMealsByIngredient = async (ingredient: string): Promise<MealPreview[]> => {
  const config = useRuntimeConfig()
  const { data } = await axios.get(`${config.public.apiBaseUrl}/filter.php?i=${ingredient}`)
  return data.meals || []
}

// Fungsi untuk mengambil detail makanan (Optional Task)
export const getMealDetail = async (id: string): Promise<MealDetail | null> => {
  const config = useRuntimeConfig()
  const { data } = await axios.get(`${config.public.apiBaseUrl}/lookup.php?i=${id}`)
  return data.meals?.[0] || null
}