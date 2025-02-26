'use client'

import { useEffect, useState } from 'react'

const fetchMealById = async (mealId: string) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
  )
  const data = await res.json()
  return data.meals[0]
}

export default function MealPage({ params }: { params: { meal: string } }) {
  const [mealData, setMealData] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const meal = await fetchMealById(params.meal)
      setMealData(meal)
    }

    fetchData()
  }, [params.meal])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const handleAddToFavorites = () => {
    if (!mealData) return

    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.idMeal === mealData.idMeal)) {
        return prevFavorites.filter((fav) => fav.idMeal !== mealData.idMeal)
      }
      return [...prevFavorites, mealData]
    })
  }

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
      <button onClick={handleAddToFavorites} className="mt-4 rounded px-4 py-2 border">
        {favorites.some((fav) => fav.idMeal === mealData.idMeal)
          ? 'Remove from Favorites'
          : 'Add to Favorites'}
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
