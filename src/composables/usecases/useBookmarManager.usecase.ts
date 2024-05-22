import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type Video from '../../models/video.interface'

interface BookmarkManager {
  selectVideo: (id: string) => void
  removeAndUpdate: (id: string, index: number) => Promise<void>
}

export function useBookmarManager(
  videos: Ref<Video[]>,
  getVideos: () => Promise<void>,
  deleteVideo: (id: string, index: number) => Promise<void>
): BookmarkManager {
  const selectedVideoId = ref<string>('')

  const router = useRouter()

  function selectVideo(id: string): void {
    selectedVideoId.value = id
  }

  async function removeAndUpdate(id: string, index: number): Promise<void> {
    deleteVideo(id, index).then(async () => {
      if (id === selectedVideoId.value && videos.value.length > 1) {
        const id = videos.value[0]._id as string
        selectVideo(id)
        await router.push(`/bookmarks/detail/${id}`)
      } else if (videos.value.length === 1) {
        await router.push('/bookmarks')
      }
    })
  }

  onMounted(async () => {
    await getVideos()
    if (videos.value.length > 0) {
      const id = videos.value[0]._id as string
      selectVideo(id)
    }
  })

  return {
    selectVideo,
    removeAndUpdate
  }
}
