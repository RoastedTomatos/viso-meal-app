'use client'

import { useState, useEffect } from 'react'
import { MealCard } from '../components/MealCard'
import Link from 'next/link'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  strArea: string
  strCategory: string
  strTags: string | null
  strYoutube: string
  [key: string]: string | null
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Meal[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  if (favorites.length === 0) {
    return (
      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold">Your Favorite Recipes</h2>
        <p>No favorite recipes added yet!</p>
      </div>
    )
  }

  return (
    <section className="m-5 flex flex-col">
      <h1 className="flex justify-center text-xl font-bold">
        Favorite Recipes
      </h1>
      <div className="flex flex-wrap gap-4">
        {favorites.map((meal: Meal) => (
          <Link
            key={meal.idMeal}
            href={`/${meal.idMeal}`}
            className="w-[calc(25%-12px)] bg-white p-4 shadow-md hover:bg-slate-100"
          >
            <MealCard meal={meal} />
          </Link>
        ))}
      </div>
    </section>
  )
}
