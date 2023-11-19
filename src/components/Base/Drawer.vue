<template>
  <!-- Drawer Trigger -->
  <div>
    <slot name="trigger" />
  </div>
  <!-- Drawer Content -->
  <div
    v-if="modelValue"
    @click.self="emit('update:modelValue', !modelValue)"
    class="fixed top-0 left-0 inset-0 bg-[#00000035] backdrop-blur-md z-50"
  >
    <!--
      NOTE::
      ------ I won't be adding transitions to save time.
    -->

    <div class="w-11/12 h-full sm:w-72 bg-primary" v-bind="containerAttrs">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  containerAttrs: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => route.path,
  () => {
    emit('update:modelValue', false)
  }
)
</script>
