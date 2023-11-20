<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="mb-5">
      <h2 class="text-2xl font-semibold text-slate-800">
        Edit <strong class="capitalize text-primary">{{ movie?.title }}</strong> Movie
      </h2>
    </div>
    <div class="w-11/12 px-3 py-2 border sm:p-4 rounded-2xl sm:w-96 md:w-[480px]">
      <div class="pb-1 mb-2 border-b">
        <h4 class="text-lg font-semibold">Basic Info</h4>
      </div>

      <div>
        <div>
          <label for="title" class="text-sm text-slate-800">Title</label>
        </div>
        <Input
          class="w-full text-slate-700"
          id="title"
          v-bind="title"
          :class="{
            '!ring-red-500': basicErrors?.title
          }"
        />
        <div class="text-red-500">
          <small>
            <i>{{ basicErrors?.title }}</i>
          </small>
        </div>
      </div>
      <div>
        <div class="mt-1">
          <label for="description" class="text-sm text-slate-800">
            Description
            <small class="text-slate-400">
              <i>(optional)</i>
            </small>
          </label>
        </div>
        <Input
          class="w-full text-slate-700"
          id="description"
          v-bind="description"
          :class="{
            '!ring-red-500': basicErrors?.description
          }"
        />
        <div class="text-red-500">
          <small>
            <i>{{ basicErrors?.description }}</i>
          </small>
        </div>
      </div>
      <div>
        <div class="mt-1">
          <label for="year" class="text-sm text-slate-800">Year</label>
        </div>
        <Input
          class="w-full text-slate-700"
          id="year"
          v-bind="year"
          :class="{
            '!ring-red-500': basicErrors?.year
          }"
        />
        <div class="text-red-500">
          <small>
            <i>{{ basicErrors?.year }}</i>
          </small>
        </div>
      </div>

      <!-- actors -->
      <div class="flex justify-between pb-1 mt-3 border-b">
        <h4 class="text-lg font-semibold">Actors</h4>
        <Button @click="toggleAddActorDialog" class="!border-none !py-1 !px-2" btn-style="ghost">
          <i class="bi bi-plus-circle"></i>
        </Button>
      </div>
      <!-- table -->
      <div class="mt-2">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-slate-500">
            <thead class="text-xs uppercase text-slate-700 bg-slate-50">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Age</th>
                <th scope="col" class="px-6 py-3 truncate">Join Date</th>
                <th scope="col" class="px-6 py-3">Role</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody v-if="actors?.length">
              <tr v-for="(actor, index) in actors" class="bg-white border-b">
                <th scope="row" class="max-w-xs px-6 py-4 font-medium truncate text-slate-900">
                  {{ actor.name }}
                </th>
                <td class="px-6 py-4 truncate">
                  {{ actor.age }}
                </td>
                <td class="px-6 py-4 truncate">
                  {{ actor.join_date }}
                </td>
                <td class="px-6 py-4 truncate">
                  {{ actor.role }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-3">
                    <Button
                      @click="openUpdateActorDialog(actor)"
                      btn-style="stripped"
                      class="text-blue-500"
                    >
                      Edit
                    </Button>
                    <Button @click="removeActor(index)" btn-style="stripped" class="text-red-500">
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <template v-if="!actors?.length">
            <div class="px-1 py-2 text-sm text-slate-500">No actors added yet...</div>
          </template>
        </div>
      </div>

      <!-- action button -->
      <div class="flex gap-3 pt-2 mt-2 sm:gap-5">
        <Button
          @click="submitEdition"
          :disabled="!submitEditionValid"
          btn-style="primary"
          class="w-full sm:w-1/2 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span class="mx-1">
            <i class="bi bi-pencil-square"></i>
          </span>
          Submit Edition
        </Button>
        <Button
          @dblclick="deleteMovie"
          class="w-full text-red-500 border-red-500 sm:w-1/2 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed hover:bg-red-50"
        >
          <span class="mx-1">
            <i class="bi bi-pencil-square"></i>
          </span>
          Delete
          <small>
            <i>(double click)</i>
          </small>
        </Button>
      </div>
    </div>
  </div>

  <!-- actors dialog -->
  <Dialog v-model="actorDialog">
    <div class="w-11/12 bg-white rounded-xl sm:w-96">
      <div class="p-3 pb-1 text-lg font-semibold border-b sm:p-4">Actor Info</div>
      <div class="p-3 sm:p-4">
        <div>
          <div>
            <label for="actor_name" class="text-sm text-slate-800">Name</label>
          </div>
          <Input
            class="w-full text-slate-700"
            id="actor_name"
            v-bind="actorName"
            :class="{
              '!ring-red-500': actorErrors?.name
            }"
          />
          <div class="text-red-500">
            <small>
              <i>{{ actorErrors?.name }}</i>
            </small>
          </div>
        </div>
        <div>
          <div>
            <label for="actor_age" class="text-sm text-slate-800">Age</label>
          </div>
          <Input
            class="w-full text-slate-700"
            id="actor_age"
            v-bind="actorAge"
            :class="{
              '!ring-red-500': actorErrors?.age
            }"
          />
          <div class="text-red-500">
            <small>
              <i>{{ actorErrors?.age }}</i>
            </small>
          </div>
        </div>
        <div>
          <div>
            <label for="actor_join_date" class="text-sm text-slate-800">Join Date</label>
          </div>
          <Input
            class="w-full text-slate-700"
            id="actor_join_date"
            v-bind="actorJoinDate"
            type="date"
            :class="{
              '!ring-red-500': actorErrors?.join_date
            }"
          />
          <div class="text-red-500">
            <small>
              <i>{{ actorErrors?.join_date }}</i>
            </small>
          </div>
        </div>
        <div class="mt-1">
          <div>
            <h3 class="text-sm text-slate-800">Join Date</h3>
          </div>
          <div class="flex flex-wrap gap-1 mt-1">
            <span
              v-for="(role, i) in actorRoles"
              :key="i"
              class="px-1.5 py-0.5 rounded-full border truncate text-xs select-none cursor-pointer hover:border-primary duration-100 active:scale-95"
              :class="{ 'bg-primary text-white': actorRole === role }"
              @click="updateActorRole(role)"
            >
              {{ role }}
            </span>
          </div>
        </div>

        <div>
          <div class="mt-5">
            <Button
              v-if="!editMode"
              btn-style="ghost"
              :disabled="!actorActionValid"
              class="disabled:opacity-60 disabled:cursor-not-allowed"
              @click="addActor"
            >
              <i class="bi bi-plus-circle"></i>
              Add Actor
            </Button>
            <Button
              v-else-if="editMode"
              btn-style="outline"
              :disabled="!actorActionValid"
              class="disabled:opacity-60 disabled:cursor-not-allowed"
              @click="updateActor"
            >
              <i class="bi bi-pencil-square"></i>
              Update Actor
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/Base/Button.vue'
import { getMovie } from '@/utils/movies'
import { useRoute } from 'vue-router'
// @ts-ignore
import Dialog from '@/components/Base/Dialog.vue'
import Input from '@/components/Base/Input.vue'
import type { IActor } from '@/types'
import { uuid } from '@/utils/helpers'

import { useForm } from 'vee-validate'
import { computed, onBeforeMount, ref, shallowReactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { date, number, object, string } from 'yup'
import { key } from '../stores'
const store = useStore(key)
const router = useRouter()

const route = useRoute()
const movieId: string = typeof route.params.movieId === 'string' ? route.params.movieId : '0'
const movie = getMovie(movieId)

const {
  values: basicInfo,
  errors: basicErrors,
  defineInputBinds: defineBasicInputBinds
} = useForm({
  validationSchema: object({
    title: string().required(),
    description: string().optional(),
    year: number().required()
  })
})

const title = defineBasicInputBinds('title')
const description = defineBasicInputBinds('description')
const year = defineBasicInputBinds('year')

// actors
const actors = ref<IActor[]>([])
const actorDialog = ref(false)

const toggleAddActorDialog = () => {
  actorDialog.value = !actorDialog.value
}

watch(actorDialog, (newV) => {
  if (!newV) {
    editMode.value = false
    actorActiveId.value = undefined
    actorName.value.value = undefined
    actorAge.value.value = undefined
    actorJoinDate.value.value = undefined
    actorRole.value = undefined
  }
})

const {
  values: actorInfo,
  errors: actorErrors,
  defineInputBinds: defineActorInputBinds
} = useForm({
  validationSchema: object({
    name: string().required(),
    age: number().required(),
    join_date: date().required()
  })
})
const actorName = defineActorInputBinds('name')
const actorAge = defineActorInputBinds('age')
const actorJoinDate = defineActorInputBinds('join_date')
const actorRole = ref()
const actorRoles = shallowReactive([
  'Background role',
  'Cameo',
  'Recurring character',
  'Side character',
  'Series regular'
])
const updateActorRole = (role: string) => {
  actorRole.value = role
}

const actorActionValid = computed(() => {
  return (
    !Object.keys(actorErrors.value)?.length &&
    actorName.value.value &&
    actorAge.value.value &&
    actorJoinDate.value.value &&
    !!actorRole.value
  )
})

const addActor = () => {
  actors.value.push({
    id: uuid(),
    name: actorName.value.value,
    age: actorAge.value.value,
    join_date: actorJoinDate.value.value,
    role: actorRole.value
  })
  toggleAddActorDialog()
}

const editMode = ref(false)
const actorActiveId = ref()
const openUpdateActorDialog = (actor: IActor) => {
  actorActiveId.value = actor.id
  actorName.value.value = actor.name
  actorAge.value.value = actor.age
  actorJoinDate.value.value = actor.join_date
  actorRole.value = actor.role
  editMode.value = true
  toggleAddActorDialog()
}

const updateActor = () => {
  const index = actors.value.findIndex((actor) => actor.id === actorActiveId.value)

  if (index !== -1) {
    actors.value[index] = {
      id: actors.value[index].id,
      name: actorName.value.value,
      age: actorAge.value.value,
      join_date: actorJoinDate.value.value,
      role: actorRole.value
    }
  }

  toggleAddActorDialog()
}

const removeActor = (index: number) => {
  actors.value.splice(index, 1)
}

const submitEditionValid = computed(() => {
  return (
    title.value.value &&
    year.value.value &&
    actors.value?.length &&
    (!basicErrors?.value || !Object.keys(basicErrors?.value)?.length)
  )
})

const submitEdition = () => {
  store.dispatch('editMovie', {
    id: movieId,
    title: title.value.value,
    description: description.value.value,
    year: year.value.value,
    actors: actors.value
  })

  router.push('/')
}

const deleteMovie = () => {
  // no need to send the new data even if it was different, the movie id is the one needed and it doesn't change
  store.dispatch('removeMovie', movie)
  router.push('/')
}

onBeforeMount(() => {
  title.value.value = movie?.title
  description.value.value = movie?.description
  year.value.value = movie?.year
  actors.value = movie?.actors || []
})
</script>
