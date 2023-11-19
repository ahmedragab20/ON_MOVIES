import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMoviesStore = defineStore('movies', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
