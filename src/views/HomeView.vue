<template>
  <div class="flex items-center justify-center h-screen gap-3">
    <pre>
      <span class="text-start">
        {{ res }}
      </span>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { vFetch } from 'very-good-fetch'
import { onMounted, ref } from 'vue'

const res = ref()

onMounted(async () => {
  res.value = await vFetch('https://jsonplaceholder.typicode.com/todos/1')
})
</script>
