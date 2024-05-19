<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useVideos from '../composables/useVideos'

const route = useRoute()
const video = ref<Video | null>(null)

const [videos, addVideo, getVideos, updateVideo, deleteVideo, getVideoById] = useVideos([])

onMounted(async () => {
  const id = route.params.id as string
  console.log(route.params)

  video.value = await getVideoById(id)
})
</script>

<template>
  <v-container v-if="video" class="bg-surface-variant">
    <RouterLink :to="{ name: 'bookmarks' }">Retour</RouterLink>
    <v-row>
      <v-col cols="6" md="4">
        <img :src="video.thumbnail" alt="" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="4">
        <h3>{{ video.title }}</h3>
        - Ajouté par <span>{{ video.author }}</span>
      </v-col>
      <v-col cols="12" md="4">
        <p>Durée : {{ video.duration }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
