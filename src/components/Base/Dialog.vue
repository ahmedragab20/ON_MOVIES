<template>
  <Transition name="fade-in">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-full h-screen overflow-auto flex justify-center items-center backdrop-blur-sm bg-[#c6c6c6c1]"
      @click.self="$emit('update:modelValue', false)"
    >
      <slot />
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modelValue(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  },
  mounted() {
    addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.$emit('update:modelValue', false)
      }
    })
  }
}
</script>
<style scoped>
.fade-in-leave-from,
.fade-in-enter-to {
  opacity: 1;
}
.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease-in-out;
}
</style>
