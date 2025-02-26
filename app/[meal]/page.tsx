'use client'

import { use, useEffect, useState } from 'react'
import { fetchMealById } from '@/api/index'

interface Meal {
  idMeal: string
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
  const [isFavorite, setIsFavorite] = useState(false)

  const checkIfFavorite = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.some((fav: Meal) => fav.idMeal === id))
  }

  const addToFavorites = () => {
    if (!mealData) return

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const isAlreadyFavorite = favorites.some(
      (fav: Meal) => fav.idMeal === mealData.idMeal,
    )

    if (!isAlreadyFavorite) {
      favorites.push(mealData)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMealById(meal)
      setMealData(data)
      checkIfFavorite(data.idMeal)
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
      <button
        onClick={addToFavorites}
        className={`mt-4 rounded-lg px-4 py-2 text-white ${
          isFavorite ? 'bg-green-500' : 'bg-blue-500'
        }`}
      >
        {isFavorite ? 'In Favorites' : 'Add to Favorites'}
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
