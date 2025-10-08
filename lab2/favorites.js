// Lab 2: DOM Interactivity & JavaScript Modules
// Exercise 2.2: Modular Code - favorites.js module with add/remove functions
// Exercise 2.4: Persistence with localStorage

// Store complete book data in localStorage
const favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || []

// Exercise 2.2: Function to update favorites badge count
function updateFavoritesBadge() {
  const badge = document.getElementById("favorites-badge")
  if (badge) {
    badge.textContent = favoriteBooks.length
  }
}

// Exercise 2.2: Function to add/remove favorites
// Exercise 2.3: DOM Events - handles click events to update favorites
function toggleFavorite(bookId, heartIcon, bookData = null) {
  const index = favoriteBooks.findIndex((book) => book.id === bookId)

  if (index === -1) {
    // Add to favorites - store complete book data
    if (bookData) {
      favoriteBooks.push({
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        image: bookData.image,
      })
    }
    // Update heart icon to filled red
    heartIcon.classList.remove("far", "text-gray-600")
    heartIcon.classList.add("fas", "text-red-500")
  } else {
    // Remove from favorites
    favoriteBooks.splice(index, 1)
    // Update heart icon to outline gray
    heartIcon.classList.remove("fas", "text-red-500")
    heartIcon.classList.add("far", "text-gray-600")
  }

  // Exercise 2.4: Save to localStorage for persistence
  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks))

  // Update badge count
  updateFavoritesBadge()

  // If we're on the favorites page, refresh the display
  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

// Exercise 2.1: Display favorite books on the favorites page
function displayFavoriteBooks() {
  const container = document.getElementById("favorites-container")
  const emptyMessage = document.getElementById("empty-favorites")

  if (!container) return

  // Clear container
  container.innerHTML = ""

  if (favoriteBooks.length === 0) {
    // Show empty message when no favorites
    if (emptyMessage) {
      emptyMessage.classList.remove("hidden")
    }
    container.classList.add("hidden")
  } else {
    // Hide empty message and show favorites
    if (emptyMessage) {
      emptyMessage.classList.add("hidden")
    }
    container.classList.remove("hidden")

    // Display each favorite book with numbering starting from 0
    favoriteBooks.forEach((book, index) => {
      const bookCard = document.createElement("div")
      bookCard.className =
        "bg-white overflow-hidden h-full flex flex-col border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300"
      bookCard.innerHTML = `
                <div class="p-0">
                    <div class="relative aspect-[3/4] overflow-hidden bg-gray-200">
                        <img src="../lab1/${book.image}" alt="${book.title}" class="w-full h-full object-cover">
                        <button class="absolute top-2 left-2 p-2 rounded-full bg-white hover:bg-white hover:scale-110 transition-all favorite-btn" data-book-id="${book.id}">
                            <i class="fas fa-heart text-red-500"></i>
                        </button>
                        <span class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">#${index}</span>
                    </div>
                </div>
                <div class="flex-1 p-4 flex flex-col">
                    <h3 class="text-lg font-semibold line-clamp-2 mb-2">${book.title}</h3>
                    <p class="text-gray-600 mb-3">${book.author}</p>
                    <button class="mt-auto w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">View Details</button>
                </div>
            `
      container.appendChild(bookCard)
    })

    // Exercise 2.3: Add event listeners for DOM events (clicks)
    container.querySelectorAll(".favorite-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const bookId = this.getAttribute("data-book-id")
        const heartIcon = this.querySelector("i")
        toggleFavorite(bookId, heartIcon)
      })
    })
  }
}

// Update heart states for books already in favorites
function updateHeartStates() {
  favoriteBooks.forEach((book) => {
    const heartIcon = document.querySelector(`.favorite-btn[data-book-id="${book.id}"] i`)
    if (heartIcon) {
      heartIcon.classList.remove("far", "text-gray-600")
      heartIcon.classList.add("fas", "text-red-500")
    }
  })
}

// Initialize the favorites system
function initFavorites() {
  // Set initial badge count
  updateFavoritesBadge()

  // If we're on the favorites page, display the favorite books
  if (window.location.pathname.includes("favorite.html")) {
    displayFavoriteBooks()
  }
}

// Export functions to window object for use in other modules
window.toggleFavorite = toggleFavorite
window.updateHeartStates = updateHeartStates
window.updateFavoritesBadge = updateFavoritesBadge

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initFavorites)