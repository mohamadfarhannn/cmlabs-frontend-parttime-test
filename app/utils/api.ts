import axios from 'axios'
import type { Ingredient, MealPreview, MealDetail } from '~/types'

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
})

// Fungsi untuk mengambil semua daftar ingredients
export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await api.get('/list.php?i=list')
  return data.meals || []
}

// Fungsi untuk memfilter makanan berdasarkan satu ingredient
export const getMealsByIngredient = async (ingredient: string): Promise<MealPreview[]> => {
  const { data } = await api.get(`/filter.php?i=${ingredient}`)
  return data.meals || []
}

// Fungsi untuk mengambil detail makanan (Optional Task)
export const getMealDetail = async (id: string): Promise<MealDetail | null> => {
  const { data } = await api.get(`/lookup.php?i=${id}`)
  return data.meals?.[0] || null
}