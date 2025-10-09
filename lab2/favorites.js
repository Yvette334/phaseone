// Store complete book data, not just IDs
const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || []

// Update favorites badge count
function updateFavoritesBadge() {
  const badge = document.getElementById("favorites-badge")
  if (badge) {
    badge.textContent = favoriteBooks.length
  }
}

function toggleFavorite(bookId, heartIcon, bookData = null) {
  console.log("toggleFavorite called with:", { bookId, heartIcon, bookData })

  const index = favoriteBooks.findIndex((book) => book.id === bookId)
  console.log("Current favorites:", favoriteBooks)
  console.log(" Book index in favorites:", index)

  if (index === -1) {
    // Add to favorites - store complete book data
    if (bookData) {
      favoriteBooks.push({
        id: bookId,
        title: bookData.title,
        author: bookData.author,
        image: bookData.image,
      })
      console.log("Added to favorites")
    }
    heartIcon.classList.remove("far", "text-gray-600")
    heartIcon.classList.add("fas", "text-red-500")
    console.log(" Heart icon classes after add:", heartIcon.className)
  } else {
    // Remove from favorites
    favoriteBooks.splice(index, 1)
    console.log("Removed from favorites")
    heartIcon.classList.remove("fas", "text-red-500")
    heartIcon.classList.add("far", "text-gray-600")
    console.log("Heart icon classes after remove:", heartIcon.className)
  }

  // Save to localStorage
  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks))

  // Update badge
  updateFavoritesBadge()

  // If we're on the favorites page, refresh the display
  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

// Show favorite books
function showFavorites() {
  if (favoriteBooks.length === 0) {
    alert("You haven't added any books to favorites yet!")
  } else {
    // Redirect to favorites page
    window.location.href = "favorite.html"
  }
}

function displayFavoriteBooks() {
  const container = document.getElementById("favorites-container")
  const emptyMessage = document.getElementById("empty-favorites")

  if (!container) return

  // Clear container
  container.innerHTML = ""

  if (favoriteBooks.length === 0) {
    // Show empty message
    if (emptyMessage) {
      emptyMessage.classList.remove("hidden")
    }
    container.classList.add("hidden")
  } else {
    // Hide empty message
    if (emptyMessage) {
      emptyMessage.classList.add("hidden")
    }
    container.classList.remove("hidden")

    // Display each favorite book
    favoriteBooks.forEach((book, index) => {
      const bookCard = document.createElement("div")
      bookCard.className =
        "overflow-hidden h-full flex flex-col border border-border rounded-lg bg-card hover:shadow-lg"
      bookCard.innerHTML = `
                <div class="p-0">
                    <div class="relative aspect-[3/4] overflow-hidden bg-muted">
                        <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover">
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

    // Add event listeners to the favorite buttons on the favorites page
    container.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookId = this.getAttribute("data-book-id")
        const heartIcon = this.querySelector("i")
        toggleFavorite(bookId, heartIcon)
      })
    })
  }
}

function updateHeartStates() {
  favoriteBooks.forEach((book) => {
    const heartIcon = document.querySelector(`.favorite-btn[data-book-id="${book.id}"] i`)
    if (heartIcon) {
      heartIcon.classList.remove("far", "text-gray-600")
      heartIcon.classList.add("fas", "text-red-500")
    }
  })
}

// Initialize the page
function initFavorites() {
  // Set initial badge count
  updateFavoritesBadge()

  // If we're on the favorites page, display the favorite books
  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

window.toggleFavorite = toggleFavorite
window.updateHeartStates = updateHeartStates
window.updateFavoritesBadge = updateFavoritesBadge

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initFavorites)
