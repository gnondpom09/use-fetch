<script setup lang="ts">
import type Video from '../models/video.interface'
import useVideos from '../composables/crud/useVideos'
import UpdateForm from './updateBookmark.vue'
import AddBookmarkForm from './AddNewBookmark.vue'
import DeleteBookmark from './DeleteBookmark.vue'
import { truncate } from '../utils/textTransform'
import { useBookmarManager } from '../composables/usecases/useBookmarManager.usecase'

const originalState: Video[] = []

const [videos, addVideo, getVideos, updateVideo, deleteVideo] = useVideos(originalState)

const { removeAndUpdate, selectVideo } = useBookmarManager(videos, getVideos, deleteVideo)
</script>

<template>
  <v-row>
    <v-col cols="8">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Videos</h3>
            <h5>Gérez vos favoris</h5>
          </div>
        </v-card-title>
        <div class="container">
          <div class="pa-4">
            <AddBookmarkForm :add-video="addVideo" />
          </div>
          <v-list>
            <v-list-item
              v-for="(video, index) in videos"
              :key="video._id"
              :title="truncate(video.title, 33)"
              :subtitle="`ajouté par ${video.author}`"
            >
              <template v-slot:prepend>
                <v-avatar color="grey-lighten-1">
                  <img :src="video.thumbnail" />
                </v-avatar>
              </template>
              <RouterLink
                :to="{ name: 'bookmark-detail', params: { id: String(video._id) } }"
                @click="selectVideo(String(video._id))"
                >Voir plus</RouterLink
              >

              <template v-slot:append>
                <UpdateForm :video="video" :index="index" @update="updateVideo" />
                <DeleteBookmark :id="String(video._id)" :index="index" @delete="removeAndUpdate" />
              </template>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-sheet class="bg-surface-variant">
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>
