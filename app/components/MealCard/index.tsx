'use client'

interface Meal {
  idMeal: string
  strMeal: string
  strArea: string
  strCategory: string
  strInstructions: string
  strMealThumb: string
  strTags: string
  strYoutube: string
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
      <h3 className="flex text-center justify-center mt-5 text-xl">{meal.strMeal}</h3>
    </div>
  )
}
