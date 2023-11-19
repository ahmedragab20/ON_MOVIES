<template>
  <button
    class="px-4 py-2 duration-100 border rounded-lg active:scale-95 active:translate-y-0.5"
    :class="[
      { 'bg-primary text-white border-0': btnStyle === 'primary' },
      {
        'bg-ghosted text-primary border-0': btnStyle === 'ghost'
      },
      { 'bg-transparent border-primary text-primary hover:bg-ghosted': btnStyle === 'outline' },
      { 'text-primary hover:underline !p-1 !border-0': btnStyle === 'link' },
      { '!p-1 !border-0 hover:opacity-90': btnStyle === 'stripped' },
      { 'relative overflow-hidden': to }
    ]"
  >
    <slot></slot>

    <router-link v-if="!!to" :to="to" class="absolute inset-0"></router-link>
  </button>
</template>

<script setup lang="ts">
type TBtnStyle = 'primary' | 'ghost' | 'outline' | 'link' | 'stripped'

interface Props {
  /**
   * Pre-style for the component
   * @accepts {primary, ghost, outline, link, stripped}
   */
  btnStyle?: TBtnStyle
  /**
   * will allow you to use the button as link
   */
  to?: string
}

const { btnStyle, to } = defineProps<Props>()
</script>
