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
  //Some hard coding to extract ingredients and measures
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => meal[key])
    .filter((ingredient) => ingredient && ingredient.trim() !== '')

  const measures = Object.keys(meal)
    .filter((key) => key.startsWith('strMeasure'))
    .map((key) => meal[key])
    .filter((measure) => measure && measure.trim() !== '')

  return (
    <div className="w-[calc(25%-12px)] bg-white p-4 shadow-md">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
      />
      <h3 className="flex text-center justify-center mt-5 text-xl">{meal.strMeal}</h3>
    </div>
  )
}
