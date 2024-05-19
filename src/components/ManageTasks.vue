<script setup>
import { useTasks } from '../composables/useTasks'

const originalState = [
  {
    title: 'Learn Vue',
    done: true
  },
  {
    title: 'Use Vue with Immer',
    done: false
  }
]
const [items, updateItems] = useTasks(originalState)
</script>

<template>
  <ul>
    <li
      v-for="({ title, done }, index) in items"
      :key="index"
      :class="{ done }"
      @click="updateItems(index)"
    >
      {{ title }}
    </li>
  </ul>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
