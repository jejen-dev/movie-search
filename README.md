<!-- Please update value in the {}  -->

<h1 align="center">Movie Search App | devChallenges</h1>

<div align="center">
   Solution for a challenge <a href="https://devchallenges.io/challenge/movie-search-app" target="_blank">Movie Search App</a> from <a href="http://devchallenges.io" target="_blank">devChallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://jejen-dev.github.io/movie-search-app">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/jejen-dev/movie-search-app">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/movie-search-app">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Built with](#built-with)
- [Features](#features)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](screenshot.png)

**Movie Search App** adalah aplikasi web yang memungkinkan pengguna mencari informasi film menggunakan OMDB API. Pengguna dapat mencari film berdasarkan judul, melihat detail lengkap film (sinopsis, rating, cast, dll), serta menyaring film berdasarkan genre populer.

**Apa yang telah saya capai dalam proyek ini:**
- ✅ Integrasi dengan OMDB API untuk mendapatkan data film real-time
- ✅ Fitur pencarian film dengan autocomplete
- ✅ Filter genre untuk menampilkan film-film populer berdasarkan kategori
- ✅ Tampilan responsif yang mendukung desktop, tablet, dan mobile
- ✅ Fitur trailer yang terintegrasi dengan pencarian YouTube
- ✅ Loading state dan error handling yang baik

### What I learned

Selama mengerjakan proyek ini, saya mempelajari beberapa hal penting:

1. **Async/Await dan Promise Handling**
   ```javascript
   async function fetchMoviePoster(imdbID) {
     try {
       const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
       const data = await response.json();
       return data.Poster;
     } catch (error) {
       console.error('Error:', error);
     }
   }
