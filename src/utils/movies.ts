/**
 * @module
 * 📦 Movie Controller...
 *
 * moved the movies crud inside a separate module to make it easier to move the logic around independently.
 */

import type { IMovie } from '@/types'

/**
 * get the movies from the localStorage
 */
export function getMovies(): IMovie[] {
  return JSON.parse(localStorage.getItem('movies') || '[]')
}

/**
 * get movie by movie-id
 */
export function getMovie(movieId: string): IMovie | undefined {
  const movies = getMovies()
  return movies?.find(m => m.id === movieId)
}

/**
 * update movies
 * @param movie {IMovie[]}
 */
export function updateMovies(movies: IMovie[]): IMovie[] {
  localStorage.setItem('movies', JSON.stringify(movies))

  return getMovies()
}

/**
 * Updates a movie
 * @param movie {IMovie}
 */
export function updateMovie(movie: IMovie): IMovie[] {
  const movies = getMovies()
  const index = movies.findIndex((m) => m.id === movie.id)
  if (index !== -1) {
    movies[index] = movie
  }
  return updateMovies(movies)
}

/**
 * Deletes a movie
 * @param movie {IMovie}
 */
export function deleteMovie(movie: IMovie): IMovie[] {
  const movies = getMovies()
  const index = movies.findIndex((m) => m.id === movie.id)
  if (index !== -1) {
    movies.splice(index, 1)
  }
  return updateMovies(movies)
}

/**
 * Clear movie
 */
export function clearMovies(): IMovie[] {
  return updateMovies([])
}
