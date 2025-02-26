'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMeals } from './api/index'
import { MealCard } from './components/MealCard'
import { SearchBar } from './components/SearchBar'
import Link from 'next/link'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const { data: allMeals, error, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: fetchMeals,
  })

  const filteredMeals = useMemo(() => {
    if (!allMeals) return []
    return allMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [allMeals, searchQuery])

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage)
  const paginatedMeals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredMeals.slice(start, start + itemsPerPage)
  }, [filteredMeals, currentPage])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const pageNumbers = []
  let start = Math.max(currentPage - 3, 1)
  let end = Math.min(currentPage + 3, totalPages)

  if (end - start < 6) {
    if (start === 1) end = Math.min(7, totalPages)
    else if (end === totalPages) start = Math.max(totalPages - 6, 1)
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i)
  }

  if (totalPages > 7) {
    if (start > 1) pageNumbers.unshift('...')
    if (end < totalPages) pageNumbers.push('...')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <section className="m-5 flex flex-col">
      <h1 className="flex justify-center text-xl font-bold">Meal App</h1>
      <div className="m-5 flex justify-center bg-white flex-col items-center">
        <SearchBar onSearch={handleSearch} />
        <Link href="/favorites" className="underline">
          Favorites
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {paginatedMeals.map((meal) => (
          <Link
            key={meal.idMeal}
            href={`/${meal.idMeal}`}
            className="w-[calc(25%-12px)] bg-white p-4 shadow-md hover:bg-slate-100"
          >
            <MealCard meal={meal} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex justify-center gap-4">
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => pageNumber !== '...' && setCurrentPage(pageNumber)}
              className={`px-4 py-2 rounded ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              disabled={pageNumber === '...'}
            >
              {pageNumber}
            </button>
          ))}
          {totalPages > 7 && end < totalPages && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700"
            >
              {totalPages}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
