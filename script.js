/* ============================================
   Movie Search App - JavaScript
   OMDB API Integration
   ============================================ */

// ============================================
// KONFIGURASI
// ============================================

// Masukkan API Key OMDB Anda di sini
// Dapatkan di: http://www.omdbapi.com/apikey.aspx
const OMDB_API_KEY = null; // Ganti dengan API Key Anda: "your_api_key_here"

// Mock data untuk demo jika tidak menggunakan API
const MOCK_MOVIES = {
    "avatar": {
        Title: "Avatar: The Way of Water",
        Year: "2022",
        Rated: "PG-13",
        Released: "16 Dec 2022",
        Runtime: "192 min",
        Genre: "Action, Adventure, Fantasy",
        Director: "James Cameron",
        Writer: "James Cameron, Rick Jaffa, Amanda Silver",
        Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
        Plot: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        Language: "English",
        Country: "United States",
        Awards: "Nominated for 4 Oscars",
        Poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
        imdbRating: "7.6",
        imdbVotes: "444,491"
    },
    "inception": {
        Title: "Inception",
        Year: "2010",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Christopher Nolan",
        Writer: "Christopher Nolan",
        Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        imdbRating: "8.8",
        imdbVotes: "2,500,000"
    },
    "interstellar": {
        Title: "Interstellar",
        Year: "2014",
        Genre: "Adventure, Drama, Sci-Fi",
        Director: "Christopher Nolan",
        Writer: "Jonathan Nolan, Christopher Nolan",
        Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        imdbRating: "8.7",
        imdbVotes: "2,100,000"
    },
    "the dark knight": {
        Title: "The Dark Knight",
        Year: "2008",
        Genre: "Action, Crime, Drama",
        Director: "Christopher Nolan",
        Writer: "Jonathan Nolan, Christopher Nolan",
        Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        imdbRating: "10",
        imdbVotes: "2,800,000,000"
    }
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieContainer = document.getElementById('movieContainer');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format votes number
 */
function formatVotes(votes) {
    if (!votes || votes === 'N/A') return 'N/A';
    return votes;
}

/**
 * Tampilkan loading state
 */
function showLoading() {
    movieContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Searching for movies...</p>
    </div>
  `;
}

/**
 * Tampilkan pesan "Movie not found"
 */
function showNotFound() {
    movieContainer.innerHTML = `
    <div class="not-found">
      <div class="movie-icon">🎬</div>
      <p>Movie not found</p>
      <p style="font-size: 0.75rem;">Try searching for: Avatar, Inception, Interstellar</p>
    </div>
  `;
}

/**
 * Tampilkan detail movie dengan rating di dalam movie-details (tanpa bintang)
 * @param {Object} movie - Data movie dari API atau mock
 */
function displayMovie(movie) {
    // Parse genres (bisa berupa string dengan koma atau array)
    let genres = [];
    if (movie.Genre) {
        if (Array.isArray(movie.Genre)) {
            genres = movie.Genre;
        } else {
            genres = movie.Genre.split(',').map(g => g.trim());
        }
    } else {
        genres = ['Action', 'Adventure', 'Fantasy'];
    }

    const imdbRating = movie.imdbRating || 'N/A';
    const imdbVotes = movie.imdbVotes || 'N/A';
    const posterUrl = (movie.Poster && movie.Poster !== 'N/A')
        ? movie.Poster
        : 'https://via.placeholder.com/300x450?text=No+Poster';

    movieContainer.innerHTML = `
    <div class="movie-card">
      <div class="movie-poster">
        <img src="${posterUrl}" 
             alt="${movie.Title}" 
             onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'" />
      </div>
      <div class="movie-info">
        <h1 class="movie-title">${movie.Title || 'N/A'}</h1>
        <div class="movie-genres">
          ${genres.map(genre => `<span class="genre">${genre}</span>`).join('')}
        </div>
        <p class="movie-plot">${movie.Plot || 'No plot summary available.'}</p>
        <div class="movie-details">
          <div class="detail-item">
            <span class="detail-label">Director:</span>
            <span class="detail-value">${movie.Director || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Writers:</span>
            <span class="detail-value">${movie.Writer || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Stars:</span>
            <span class="detail-value">${movie.Actors || 'N/A'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">IMDb Rating:</span>
            <span class="detail-value">${imdbRating}/10 (${formatVotes(imdbVotes)} votes)</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Search movie menggunakan OMDB API
 * @param {string} query - Judul film yang dicari
 */
async function searchWithAPI(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovie(data);
        } else {
            showNotFound();
        }
    } catch (error) {
        console.error('Error fetching movie from API:', error);
        showNotFound();
    }
}

/**
 * Search movie menggunakan mock data (demo tanpa API)
 * @param {string} query - Judul film yang dicari
 */
function searchWithMock(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const searchLower = query.toLowerCase();
            let foundMovie = null;

            // Cari di mock data berdasarkan keyword
            for (const [key, movie] of Object.entries(MOCK_MOVIES)) {
                if (searchLower.includes(key) || movie.Title.toLowerCase().includes(searchLower)) {
                    foundMovie = movie;
                    break;
                }
            }

            resolve(foundMovie);
        }, 500); // Simulasi delay API
    });
}

/**
 * Fungsi utama untuk search movie
 * @param {string} query - Judul film yang dicari
 */
async function searchMovie(query) {
    if (!query || !query.trim()) {
        showNotFound();
        return;
    }

    showLoading();

    // Pilih method berdasarkan ketersediaan API Key
    if (OMDB_API_KEY && OMDB_API_KEY !== null && OMDB_API_KEY !== '') {
        await searchWithAPI(query.trim());
    } else {
        // Gunakan mock data untuk demo
        const foundMovie = await searchWithMock(query.trim());
        if (foundMovie) {
            displayMovie(foundMovie);
        } else {
            showNotFound();
        }
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Event listener untuk tombol Search
searchButton.addEventListener('click', () => {
    searchMovie(searchInput.value);
});

// Event listener untuk Enter key pada input
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchMovie(searchInput.value);
    }
});

// Load default movie saat halaman pertama kali dibuka
window.addEventListener('DOMContentLoaded', () => {
    searchMovie('avatar');
});