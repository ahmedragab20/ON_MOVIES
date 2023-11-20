<template>
  <!-- @vue-ignore -->
  <input
    class="px-2 py-1 duration-200 border rounded-lg focus:outline-none focus:ring-primary ring-2 ring-transparent"
    @input="emit('update:modelValue', $event?.target?.value || null)"
  />
</template>
<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
