'use client'

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

type MealCardProps = {
  className?: string
  meal: Meal
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
      />
      <h3 className="mt-5 flex justify-center text-center text-xl">
        {meal.strMeal}
      </h3>
    </div>
  )
}
