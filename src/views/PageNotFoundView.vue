<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="pointer-events-none select-none">
      <h1 class="text-4xl font-bold text-center sm:text-9xl text-slate-800">
        🤓 <br />
        404
      </h1>
      <p class="text-sm font-bold text-center text-slate-600 sm:text-lg">I think you've lost!</p>
    </div>
    <div>
      <Button btn-style="link" to="/">
        <i class="bi bi-arrow-left-circle"></i>
        Back Home
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
</script>
