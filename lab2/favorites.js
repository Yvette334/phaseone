const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || []

function updateFavoritesBadge() {
  const badge = document.getElementById("favorites-badge")
  if (badge) {
    badge.textContent = favoriteBooks.length
  }
}

function toggleFavorite(bookData, heartIcon) {
  const index = favoriteBooks.findIndex((book) => book.id === bookData.id)

  if (index === -1) {
    favoriteBooks.push(bookData)
    heartIcon.classList.remove("far")
    heartIcon.classList.add("fas", "text-red-500")
  } else {
    favoriteBooks.splice(index, 1)
    heartIcon.classList.remove("fas", "text-red-500")
    heartIcon.classList.add("far")
  }

  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks))

  updateFavoritesBadge()

  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

function showFavorites() {
  if (favoriteBooks.length === 0) {
    alert("You haven't added any books to favorites yet!")
  } else {
    window.location.href = "../lab2/favorite.html"
  }
}

function displayFavoriteBooks() {
  const container = document.getElementById("favorites-container")
  const emptyMessage = document.getElementById("empty-favorites")

  if (!container) return

  container.innerHTML = ""

  if (favoriteBooks.length === 0) {
    emptyMessage.classList.remove("hidden")
    container.classList.add("hidden")
  } else {
    emptyMessage.classList.add("hidden")
    container.classList.remove("hidden")

    favoriteBooks.forEach((book) => {
      const bookCard = document.createElement("div")
      bookCard.className =
        "overflow-hidden h-full flex flex-col border border-border rounded-lg bg-card hover:shadow-lg"
      bookCard.innerHTML = `
                <div class="p-0">
                    <div class="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
                        <button class="absolute top-2 left-2 p-2 rounded-full bg-white hover:bg-white hover:scale-110 favorite-btn" data-book-id="${book.id}">
                            <i class="fas fa-heart text-red-500"></i>
                        </button>
                    </div>
                </div>
                <div class="flex-1 p-4">
                    <h3 class="text-lg line-clamp-2 mb-2">${book.title}</h3>
                    <p class="mb-3">${book.author}</p>
                </div>
                <div class="p-4 pt-0">
                    <button class="w-full px-4 py-2 border border-border rounded-lg">View Details</button>
                </div>
            `
      container.appendChild(bookCard)
    })

    container.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookId = this.getAttribute("data-book-id")
        const book = favoriteBooks.find((b) => b.id === bookId)
        const heartIcon = this.querySelector("i")
        if (book) {
          toggleFavorite(book, heartIcon)
        }
      })
    })
  }
}

function isBookFavorited(bookId) {
  return favoriteBooks.some((book) => book.id === bookId)
}

function initFavorites() {
  updateFavoritesBadge()

  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

document.addEventListener("DOMContentLoaded", initFavorites)
