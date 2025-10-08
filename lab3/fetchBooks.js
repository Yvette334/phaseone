async function fetchBooks(search = "popular") {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${search}&limit=8`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error("Error fetching books:", error)
    throw error
  }
}

let currentSearch = "popular"

async function loadBooks() {
  const grid = document.getElementById("books-grid")
  grid.innerHTML =
    '<div class="col-span-full text-center py-12"><i class="fas fa-spinner fa-spin text-4xl"></i><p class="mt-4">Loading books...</p></div>'

  try {
    const books = await fetchBooks(currentSearch)
    showBooks(books)
  } catch (error) {
    grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-red-500">
                <i class="fas fa-exclamation-circle text-4xl"></i>
                <p class="mt-4 text-xl font-semibold">Error loading books</p>
                <p class="text-gray-600">The Open Library API might be temporarily unavailable or rate-limited.</p>
                <p class="text-gray-600">Please try again in a few moments.</p>
                <button onclick="loadBooks()" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Retry
                </button>
            </div>
        `
  }
}

function showBooks(books) {
  const grid = document.getElementById("books-grid")
  grid.innerHTML = ""

  if (books.length === 0) {
    grid.innerHTML =
      '<div class="col-span-full text-center py-12"><i class="fas fa-book-open text-4xl text-gray-400"></i><p class="mt-4 text-xl">No results found</p><p class="text-gray-600">Try searching for something else</p></div>'
    return
  }

  books.forEach((book, index) => {
    const coverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "images/default-book.jpg"

    const bookId = `api-${index}`
    const bookData = {
      title: book.title,
      author: book.author_name?.[0] || "Unknown Author",
      image: coverUrl,
    }

    grid.innerHTML += `
            <div class="overflow-hidden h-full flex flex-col border border-border rounded-lg bg-card hover:shadow-lg">
                <div class="p-0">
                    <div class="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img src="${coverUrl}" alt="${book.title}" class="w-full h-full object-cover">
                        <button class="absolute top-2 left-2 p-2 rounded-full bg-white hover:bg-white hover:scale-110 favorite-btn" 
                                data-book-id="${bookId}"
                                data-book-title="${bookData.title}"
                                data-book-author="${bookData.author}"
                                data-book-image="${bookData.image}">
                            <i class="far fa-heart text-gray-600"></i>
                        </button>
                    </div>
                </div>
                <div class="flex-1 p-4">
                    <h3 class="text-lg line-clamp-2 mb-2">${book.title}</h3>
                    <p class="mb-3">${bookData.author}</p>
                </div>
                <div class="p-4 pt-0">
                    <button class="w-full px-4 py-2 border border-border rounded-lg">View Details</button>
                </div>
            </div>
        `
  })

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      console.log("[v0] Favorite button clicked!")
      console.log("[v0] Button element:", this)

      const bookId = this.getAttribute("data-book-id")
      const bookData = {
        title: this.getAttribute("data-book-title"),
        author: this.getAttribute("data-book-author"),
        image: this.getAttribute("data-book-image"),
      }
      const heartIcon = this.querySelector("i")

      console.log("[v0] Book ID:", bookId)
      console.log("[v0] Book Data:", bookData)
      console.log("[v0] Heart Icon:", heartIcon)
      console.log("[v0] window.toggleFavorite exists?", typeof window.toggleFavorite)

      window.toggleFavorite(bookId, heartIcon, bookData)
    })
  })

  if (typeof window.updateHeartStates === "function") {
    window.updateHeartStates()
  }
}

document.getElementById("Search-btn").addEventListener("click", () => {
  currentSearch = document.getElementById("inputsearch").value || "books"
  loadBooks()
})

document.getElementById("inputsearch").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    currentSearch = document.getElementById("inputsearch").value || "books"
    loadBooks()
  }
})

loadBooks()
