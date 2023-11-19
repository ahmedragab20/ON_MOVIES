<template>
  <div
    v-if="movies?.length === 0"
    class="flex flex-col items-center justify-center h-screen gap-4 p-3"
  >
    <h3>Seems you don't have any movies to list</h3>
    <Button to="/add" btn-style="primary"> Add New Movie </Button>
  </div>
  <div v-else-if="movies.length">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</div>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '../stores'

const store = useStore(key)
const movies = computed(() => store.state.movies)

onMounted(() => {
  console.log(movies.value)
})
</script>
