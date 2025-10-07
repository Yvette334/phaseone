async function fetchBooks(search = "classic") {
  const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=8`)
  const data = await response.json()
  return data.docs
}