'use client'

import { use, useEffect, useState } from 'react'
import { fetchMealById } from '@/api/index'

interface Meal {
  strMeal: string
  strMealThumb: string
  strInstructions: string
  [key: string]: string
}

export default function MealPage({
  params,
}: {
  params: Promise<{ meal: string }>
}) {
  const { meal } = use(params)
  const [mealData, setMealData] = useState<Meal | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMealById(meal)
      setMealData(data)
    }

    fetchData()
  }, [meal])

  if (!mealData) return <div>Loading...</div>

  const ingredients = Object.keys(mealData)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => mealData[key])
    .filter((ingredient) => ingredient && ingredient.trim() !== '')

  const measures = Object.keys(mealData)
    .filter((key) => key.startsWith('strMeasure'))
    .map((key) => mealData[key])
    .filter((measure) => measure && measure.trim() !== '')

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-bold">{mealData.strMeal}</h1>
      <img
        src={mealData.strMealThumb}
        alt={mealData.strMeal}
        className="w-full max-w-md rounded-lg"
      />
      <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
        Add to Favorites
      </button>
      <div>
        <h2 className="mb-4 mt-4 text-xl">Ingredients</h2>
        <ul>
          {ingredients.map((item, i) => (
            <li key={i}>
              {item} ----- {measures[i]}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="mb-4 mt-4 text-xl">Instructions</h2>
      <p className="mt-4">{mealData.strInstructions}</p>
    </div>
  )
}
