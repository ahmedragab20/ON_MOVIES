<template>
  <button
    class="px-4 py-2 duration-100 border rounded-lg active:scale-95"
    :class="[
      { 'bg-primary text-white border-0': btnStyle === 'primary' },
      {
        'bg-ghosted text-primary border-0': btnStyle === 'ghost'
      },
      { 'bg-transparent border-primary text-primary hover:bg-ghosted': btnStyle === 'outline' }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type TBtnStyle = 'primary' | 'ghost' | 'outline'

interface Props {
  /**
   * Pre-style for the component
   * @accepts {primary, ghost, outline}
   */
  btnStyle?: TBtnStyle
}

const { btnStyle } = defineProps<Props>()
</script>
