<template>
  <div
    v-if="movies?.length === 0"
    class="flex flex-col items-center justify-center h-screen gap-4 p-3"
  >
    <h3>Seems you don't have any movies to list</h3>
    <Button to="/add" btn-style="primary"> Add New Movie </Button>
  </div>
  <div class="container px-3 mx-auto mt-5 sm:px-0" v-else-if="movies.length">
    <div class="mb-5">
      <h2 class="text-2xl font-semibold text-slate-800">List of Movies</h2>
    </div>
    <!-- filters -->
    <div class="p-4 border rounded-xl">
      <div class="mb-3">
        <label for="search_target_menu" class="block mb-2 text-sm font-medium text-slate-900">
          Select a Search Target
        </label>
        <select
          name="search_target"
          id="search_target_menu"
          v-model="searchTarget"
          class="bg-slate-50 border sm:max-w-xs border-slate-300 cursor-pointer text-slate-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 focus:outline-none"
        >
          <option selected value="0">Search Target</option>
          <option value="1">Search by Name</option>
          <option value="2">Search by Year</option>
          <option value="3">Search by Actors Number</option>
        </select>
      </div>
      <div class="flex items-center gap-3 sm:gap-5">
        <div v-if="searchTarget === '1'">
          <label for="search_by_name"> Name </label>
          <div class="mt-1">
            <Input v-model="searchName" type="search" id="search_by_name" @input="filterMovies" />
          </div>
        </div>
        <div v-if="searchTarget === '2'">
          <label for="search_by_year"> Year </label>
          <div class="mt-1">
            <Input
              v-model.number="searchYear"
              type="number"
              id="search_by_year"
              @input="filterMovies"
            />
          </div>
        </div>
        <div v-if="searchTarget === '3'">
          <label for="search_by_n_actors"> Number of actors </label>
          <div class="mt-1">
            <Input
              v-model.number="searchActorsNumber"
              id="search_by_n_actors"
              type="number"
              @input="filterMovies"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 mt-5">
      <div
        v-for="movie in filteredMovies?.length ? filteredMovies : movies"
        :key="movie.id"
        class="w-full duration-100 border cursor-pointer select-none rounded-xl sm:w-80 hover:bg-slate-50 active:scale-[0.98] active:translate-y-1 active:shadow-lg"
        @click="router.push(`/edit/${movie.id}`)"
      >
        <div class="px-4 py-3">
          <h3 class="max-w-full text-lg font-bold capitalize truncate sm:text-xl text-slate-700">
            {{ movie.title }}
          </h3>
          <div class="flex justify-between w-full text-sm mt-2.5">
            <span class="text-slate-500">
              {{ movie.year }}
            </span>
            <span class="text-slate-500">
              {{ movie.actors?.length }} Actor{{ movie.actors?.length > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
import Input from '@/components/Base/Input.vue'
import { getMovies } from '@/utils/movies'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../stores'

const store = useStore(key)
const router = useRouter()

const movies = computed(() => store.state.movies)
const filteredMovies = ref()

const searchTarget = ref()

const searchName = ref()
const searchYear = ref()
const searchActorsNumber = ref()

const filterMovies = () => {
  if (searchTarget.value === '1') {
    filteredMovies.value = movies.value.filter((movie) => movie.title.includes(searchName.value))
  } else if (searchTarget.value === '2') {
    filteredMovies.value = movies.value.filter((movie) => +movie.year === searchYear.value)
  } else if (searchTarget.value === '3') {
    filteredMovies.value = movies.value.filter(
      (movie) => movie.actors.length === searchActorsNumber.value
    )
  } else {
    filteredMovies.value = movies.value
  }
}

watch(searchTarget, (nv, od) => {
  if (filteredMovies.value?.length) {
    filteredMovies.value.length = 0
  }
})

onBeforeMount(() => {
  store.dispatch('setMovies', getMovies())
})
</script>
