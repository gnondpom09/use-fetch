<script setup lang="ts">
import { toRefs, ref, watchEffect } from 'vue'
import useVideos from '../composables/crud/useVideos'
import type Video from '@/models/video.interface'

const props = defineProps<{
  id?: string
}>()

const { id } = toRefs(props)

const video = ref<Video | null>(null)

const [videos, isLoading, addVideo, getVideos, updateVideo, deleteVideo, getVideoById] = useVideos(
  []
)

watchEffect(async () => {
  if (!id.value) {
    getVideos().then(() => {
      video.value = videos.value[0]
    })
  } else {
    video.value = await getVideoById(id.value)
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
    <h2>{{ video?.title }}</h2>
    <v-row>
      <v-col cols="12">
        <div class="img-container mt-4">
          <img :src="video?.thumbnail" alt="" />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        par <span>{{ video?.author }}</span>
      </v-col>
      <v-col cols="12">
        <p>Durée : {{ video?.duration }} s</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.img-container {
  img {
    width: 100%;
  }
}
</style>
