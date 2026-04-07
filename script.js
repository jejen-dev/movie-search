/* ============================================
   Movie Search App - JavaScript
   OMDB API Integration + Genre Filter + Popular Movies
   ============================================ */

// ============================================
// KONFIGURASI
// ============================================

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieContainer = document.getElementById('movieContainer');
const popularMoviesGrid = document.getElementById('popularMoviesGrid');
const genreFilters = document.getElementById('genreFilters');

// State
let currentGenre = 'all';

// ============================================
// DATA POPULAR MOVES (Dengan IMDb ID untuk ambil poster)
// ============================================

const popularMoviesByGenre = {
    action: [
        { title: "The Dark Knight", year: "2008", genre: "Action", imdbID: "tt0468569" },
        { title: "Mad Max: Fury Road", year: "2015", genre: "Action", imdbID: "tt1392190" },
        { title: "John Wick", year: "2014", genre: "Action", imdbID: "tt2911666" },
        { title: "Gladiator", year: "2000", genre: "Action", imdbID: "tt0172495" }
    ],
    adventure: [
        { title: "Indiana Jones and the Raiders of the Lost Ark", year: "1981", genre: "Adventure", imdbID: "tt0082971" },
        { title: "Jurassic Park", year: "1993", genre: "Adventure", imdbID: "tt0107290" },
        { title: "The Lord of the Rings: The Fellowship of the Ring", year: "2001", genre: "Adventure", imdbID: "tt0120737" }
    ],
    comedy: [
        { title: "Superbad", year: "2007", genre: "Comedy", imdbID: "tt0829482" },
        { title: "The Hangover", year: "2009", genre: "Comedy", imdbID: "tt1119646" },
        { title: "Bridesmaids", year: "2011", genre: "Comedy", imdbID: "tt1478338" }
    ],
    drama: [
        { title: "The Shawshank Redemption", year: "1994", genre: "Drama", imdbID: "tt0111161" },
        { title: "Forrest Gump", year: "1994", genre: "Drama", imdbID: "tt0109830" },
        { title: "The Godfather", year: "1972", genre: "Drama", imdbID: "tt0068646" }
    ],
    'sci-fi': [
        { title: "Inception", year: "2010", genre: "Sci-Fi", imdbID: "tt1375666" },
        { title: "The Matrix", year: "1999", genre: "Sci-Fi", imdbID: "tt0133093" },
        { title: "Interstellar", year: "2014", genre: "Sci-Fi", imdbID: "tt0816692" }
    ],
    horror: [
        { title: "The Conjuring", year: "2013", genre: "Horror", imdbID: "tt1457767" },
        { title: "Get Out", year: "2017", genre: "Horror", imdbID: "tt5052448" },
        { title: "A Quiet Place", year: "2018", genre: "Horror", imdbID: "tt6644200" }
    ],
    romance: [
        { title: "Titanic", year: "1997", genre: "Romance", imdbID: "tt0120338" },
        { title: "The Notebook", year: "2004", genre: "Romance", imdbID: "tt0332280" },
        { title: "La La Land", year: "2016", genre: "Romance", imdbID: "tt3783958" }
    ],
    thriller: [
        { title: "Se7en", year: "1995", genre: "Thriller", imdbID: "tt0114369" },
        { title: "Gone Girl", year: "2014", genre: "Thriller", imdbID: "tt2267998" },
        { title: "Prisoners", year: "2013", genre: "Thriller", imdbID: "tt1392214" }
    ],
    crime: [
        { title: "Pulp Fiction", year: "1994", genre: "Crime", imdbID: "tt0110912" },
        { title: "The Godfather", year: "1972", genre: "Crime", imdbID: "tt0068646" },
        { title: "Goodfellas", year: "1990", genre: "Crime", imdbID: "tt0099685" }
    ],
    all: [
        { title: "The Dark Knight", year: "2008", genre: "Action", imdbID: "tt0468569" },
        { title: "Inception", year: "2010", genre: "Sci-Fi", imdbID: "tt1375666" },
        { title: "The Shawshank Redemption", year: "1994", genre: "Drama", imdbID: "tt0111161" },
        { title: "Pulp Fiction", year: "1994", genre: "Crime", imdbID: "tt0110912" },
        { title: "Forrest Gump", year: "1994", genre: "Drama", imdbID: "tt0109830" },
        { title: "The Matrix", year: "1999", genre: "Sci-Fi", imdbID: "tt0133093" },
        { title: "Interstellar", year: "2014", genre: "Sci-Fi", imdbID: "tt0816692" },
        { title: "Titanic", year: "1997", genre: "Romance", imdbID: "tt0120338" }
    ]
};

// Cache untuk poster yang sudah di-load
const posterCache = {};

// ============================================
// FUNGSI GLOBAL
// ============================================

window.watchTrailer = function (movieTitle) {
    const searchQuery = `${movieTitle} official trailer`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeUrl, '_blank');
};

function formatVotes(votes) {
    if (!votes || votes === 'N/A') return 'N/A';
    return votes;
} function showLoading() {
    movieContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Searching for movies...</p>
    </div>
  `;
} function showNotFound() {
    movieContainer.innerHTML = `
    <div class="not-found">
      <div class="movie-icon">❓</div>
      <p>MOVIE NOT FOUND</p>
      <p style="font-size: 0.75rem;">Try searching for: Avatar, Inception, Interstellar, The Dark Knight</p>
    </div>
  `;
} function displayMovie(movie) {
    let genres = [];
    if (movie.Genre) {
        genres = movie.Genre.split(',').map(g => g.trim());
    } else {
        genres = ['Action', 'Adventure', 'Fantasy'];
    }

    const imdbRating = movie.imdbRating || 'N/A';
    const imdbVotes = movie.imdbVotes || 'N/A';
    const posterUrl = (movie.Poster && movie.Poster !== 'N/A')
        ? movie.Poster
        : 'https://placehold.net/600x800.png?text=No+Poster';

    const safeTitle = movie.Title.replace(/'/g, "\\'").replace(/"/g, '&quot;');

    movieContainer.innerHTML = `
    <div class="movie-card">
      <div class="movie-poster">
        <img src="${posterUrl}" 
             alt="${movie.Title}" 
             onerror="this.src='https://placehold.net/600x800.png?text=No+Poster'" />
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
        <button class="watch-trailer-btn" onclick="window.watchTrailer('${safeTitle}')">
          🎬 Watch Trailer on YouTube
        </button>
      </div>
    </div>
  `;
}

// ============================================
// POPULAR MOVIES FUNCTIONS (Dengan Poster Asli)
// ============================================

/**
 * Ambil poster dari OMDB API berdasarkan IMDb ID
 */
async function fetchMoviePoster(imdbID) {
    if (posterCache[imdbID]) {
        return posterCache[imdbID];
    }

    try {
        // UBAH: panggil API internal, bukan OMDB langsung
        const response = await fetch(`/api/movie?imdbID=${imdbID}`);
        const data = await response.json();

        let posterUrl = 'https://via.placeholder.com/300x450/20293A/FFFFFF?text=No+Poster';
        if (data.Poster && data.Poster !== 'N/A') {
            posterUrl = data.Poster;
        }

        posterCache[imdbID] = posterUrl;
        return posterUrl;

    } catch (error) {
        console.error('Error fetching poster:', error);
        return 'https://via.placeholder.com/300x450/20293A/FFFFFF?text=No+Poster';
    }
}

/**
 * Load popular movies dengan poster asli
 */
async function loadPopularMovies(genre = 'all') {
    if (!popularMoviesGrid) return;

    popularMoviesGrid.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading movies...</p></div>';

    const movies = popularMoviesByGenre[genre] || popularMoviesByGenre.all;

    // Load semua poster secara paralel
    const moviesWithPosters = await Promise.all(
        movies.map(async (movie) => {
            const posterUrl = await fetchMoviePoster(movie.imdbID);
            return { ...movie, posterUrl };
        })
    );

    // Tampilkan movies dengan poster
    popularMoviesGrid.innerHTML = '';

    moviesWithPosters.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'popular-movie-card';
        movieCard.onclick = () => searchMovie(movie.title);

        movieCard.innerHTML = `
            <img class="popular-movie-poster" src="${movie.posterUrl}" alt="${movie.title}" 
                 onerror="this.src='https://via.placeholder.com/300x450/20293A/FFFFFF?text=${encodeURIComponent(movie.title)}'">
            <div class="popular-movie-info">
                <div class="popular-movie-title">${movie.title}</div>
                <div class="popular-movie-year">${movie.year}</div>
                <div class="popular-movie-genre">${movie.genre}</div>
            </div>
        `;

        popularMoviesGrid.appendChild(movieCard);
    });
}

// ============================================
// GENRE FILTER FUNCTIONS
// ============================================

function setupGenreFilters() {
    if (!genreFilters) return;

    const filters = document.querySelectorAll('.genre-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const genre = filter.dataset.genre;
            currentGenre = genre;

            loadPopularMovies(genre);

            if (searchInput) searchInput.value = '';
            if (movieContainer) movieContainer.innerHTML = '';

            const popularSection = document.querySelector('.popular-section');
            if (popularSection) popularSection.classList.remove('hidden');
        });
    });
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

async function searchWithAPI(query) {
    try {
        // UBAH: panggil API internal, bukan OMDB langsung
        const response = await fetch(`/api/movie?search=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.Response === 'True') {
            displayMovie(data);
            const popularSection = document.querySelector('.popular-section');
            if (popularSection) popularSection.classList.add('hidden');
        } else {
            showNotFound();
        }
    } catch (error) {
        console.error('Error fetching movie from API:', error);
        showNotFound();
    }
}

async function searchMovie(query) {
    if (!query || !query.trim()) {
        showNotFound();
        return;
    }

    showLoading();
    // UBAH: langsung panggil searchWithAPI, tidak perlu cek API key
    await searchWithAPI(query.trim());
}

// ============================================
// EVENT LISTENERS
// ============================================

if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query.trim()) {
            searchMovie(query);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value;
            if (query.trim()) {
                searchMovie(query);
            }
        }
    });
}

// ============================================
// INITIALIZE
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    console.log("Movie Search App Started");
    setupGenreFilters();
    loadPopularMovies('all');
    searchMovie('inception');
});