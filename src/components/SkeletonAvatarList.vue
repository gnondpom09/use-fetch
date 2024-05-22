<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <v-skeleton-loader
    v-for="index in count"
    :key="index"
    type="list-item-avatar-three-line"
  ></v-skeleton-loader>
</template>
