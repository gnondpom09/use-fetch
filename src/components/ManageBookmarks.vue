<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type Video from '../models/video.interface'
import useVideos from '../composables/useVideos'
import UpdateForm from './updateBookmark.vue'
import AddBookmarkForm from './AddNewBookmark.vue'
import DeleteBookmark from './DeleteBookmark.vue'

const originalState: Video[] = []

const router = useRouter()

const [videos, addVideo, getVideos, updateVideo, deleteVideo] = useVideos(originalState)

const selectedVideoId = ref<string>('')

onMounted(async () => {
  await getVideos()
})

function selectVideo(id: string) {
  selectedVideoId.value = id
}

function removeAndUpdate(id: string, index: number) {
  if (id === selectedVideoId.value && videos.value.length > 1) {
    deleteVideo(id, index).then(() => {
      const id = videos.value[0]._id
      selectVideo(id)
      router.push(`/bookmarks/detail/${id}`)
    })
  } else if (videos.length === 1) {
    router.push('/bookmarks')
  }
}

function truncate(str, num) {
  if (str.length <= num) {
    return str
  }
  return `${str.slice(0, num)}...`
}
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
                <UpdateForm :video="video" :index="index" :update="updateVideo" />
                <DeleteBookmark :id="String(video._id)" :index="index" :delete="removeAndUpdate" />
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
