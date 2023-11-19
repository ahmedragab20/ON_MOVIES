/**
 * There's no point from making a store to handle that, but it's mentioned in the task requirements
 */

import type { IMovie } from '@/types'
import { clearMovies, deleteMovie, updateMovie, updateMovies } from '@/utils/movies'
import type { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex'

/**
 * NOTE:: if you faced an issue in the vuex types, check this out: https://github.com/vuejs/vuex/issues/2223
 */

export interface State {
  movies: IMovie[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    movies: []
  },
  mutations: {
    setMovies(state: State, movies: IMovie[]) {
      state.movies = updateMovies(movies)
    },
    editMovie(state: State, movie: IMovie) {
      state.movies = updateMovie(movie)
    },
    removeMovie(state: State, movie: IMovie) {
      state.movies = deleteMovie(movie)
    },
    removeAllMovies(state: State) {
      state.movies = clearMovies()
    }
  },
  actions: {
    setMovies(context, movies: IMovie[]) {
      context.commit('setMovies', movies)
    },
    editMovie(context, movie: IMovie) {
      context.commit('editMovie', movie)
    },
    removeMovie(context, movie: IMovie) {
      context.commit('removeMovie', movie)
    },
    removeAllMovies(context) {
      context.commit('removeAllMovies')
    }
  }
})
