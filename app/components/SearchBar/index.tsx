'use client'

import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [query, onSearch])

  return (
    <div className="w-full min-w-[200px] max-w-sm">
      <div className="relative">
        <input
          className="ease w-full rounded-md border border-slate-200 bg-transparent py-2 pl-3 pr-28 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
          placeholder="Search for recipes..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="absolute right-1 top-1 flex items-center rounded border border-transparent bg-slate-800 px-2.5 py-1 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  )
}
