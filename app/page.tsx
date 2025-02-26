'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchMeals } from './api'
import { MealCard } from './components/MealCard'
import { SearchBar } from './components/SearchBar'

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
  })
  if (isLoading) {
    return <div>Loading...</div> // Place for Loader component in future
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div> // Maybe there will be styled error window
  }

  console.log(data[5])

  return (
    <section className="flex flex-col m-5">
      <h1 className='flex justify-center text-xl font-bold'>Meal App</h1>
      <div className='flex justify-center bg-white m-5'>
        <SearchBar />
      </div>
      <div className="flex flex-wrap gap-4">
        {data.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  )
}
