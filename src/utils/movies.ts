/**
 * @module
 * 📦 Movie Controller...
 */

import type { IMovie } from '@/types'

/**
 * get the movies from the localStorage
 */
export function getMovies(): IMovie[] {
  return JSON.parse(localStorage.getItem('movies') || '[]')
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
  const index = movies.findIndex((m) => m.title === movie.title)
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
  const index = movies.findIndex((m) => m.title === movie.title)
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
