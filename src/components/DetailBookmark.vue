<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import useVideos from '../composables/crud/useVideos'
// import type Video from '@/models/video.interface'
import { useBookmarManager } from '@/composables/usecases/useBookmarManager.usecase'
// import type Video from '@/models/video.interface'

const props = defineProps<{
  id?: string
}>()

const { id } = toRefs(props)

// const video = ref<Video | null>(null)

const [videos, isLoading, addVideo, getVideos, updateVideo, deleteVideo, getVideoById] = useVideos(
  []
)

const { currentVideo } = useBookmarManager(videos, getVideos, deleteVideo, addVideo, updateVideo)

watchEffect(async () => {
  if (!id.value) {
    getVideos().then(() => {
      currentVideo.value = videos.value[0]
    })
  } else {
    currentVideo.value = await getVideoById(id.value)
  }
})
</script>

<template>
  <v-skeleton-loader
    v-if="isLoading"
    class="mx-auto border"
    max-width="300"
    type="image, article"
  ></v-skeleton-loader>
  <v-container v-else>
    <h2>{{ currentVideo?.title }}</h2>
    <v-row>
      <v-col cols="12">
        <div class="img-container mt-4">
          <iframe
            :src="currentVideo?.source"
            width="100%"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="Reinier Optekamp Freestyle Ski"
          ></iframe>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        par <span>{{ currentVideo?.author }}</span>
      </v-col>
      <v-col cols="12">
        <p>Durée : {{ currentVideo?.duration }} s</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
