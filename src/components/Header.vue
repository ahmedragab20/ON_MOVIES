<template>
  <div class="p-3 border-b">
    <div class="container flex justify-between mx-auto">
      <h1 class="text-2xl font-bold select-none">
        <router-link to="/" class="flex items-center">
          <strong> T </strong>
          <div class="w-5">
            <img
              src="@/assets/logo.svg"
              alt="logo"
              width="25"
              class="object-contain w-full pointer-events-none"
            />
          </div>
        </router-link>
      </h1>

      <!-- Drawer -->
      <Drawer
        v-model="drawerActive"
        :container-attrs="{
          class: 'p-2'
        }"
      >
        <template #trigger>
          <Button @click="toggleDrawer" class="!py-1 !px-3">
            <i class="bi bi-list"></i>
          </Button>
        </template>

        <template #default>
          <router-link
            v-for="(l, i) in list"
            :key="i"
            :to="l.path"
            class="flex w-full gap-3 p-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-primary"
          >
            <span>
              <i class="bi" :class="l.icon"></i>
            </span>
            <span>{{ l.name }}</span>
          </router-link>
        </template>
      </Drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
import Drawer from '@/components/Base/Drawer.vue'

import { ref, shallowReactive } from 'vue'

const drawerActive = ref(false)
const toggleDrawer = () => {
  drawerActive.value = !drawerActive.value
}

const list = shallowReactive([
  // { name: 'Home', path: '/', icon: 'bi-house' }, no need for it
  { name: 'Add New Product', path: '/add', icon: 'bi-plus-circle' }
])
</script>
