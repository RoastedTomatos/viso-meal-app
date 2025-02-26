'use client'
export const fetchMeals = async () => {
  const meals = []
  //Tried this in my earliest projects, seems to work (Now we getting all meals)
  for (let letter = 97; letter <= 122; letter++) {
    const letterUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(letter)}`
    const res = await fetch(letterUrl)
    const data = await res.json()

    if (data.meals) {
      meals.push(...data.meals)
    }
  }

  return meals
}
