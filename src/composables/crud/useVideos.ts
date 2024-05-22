import { shallowRef, ref } from 'vue'
import videoService from '../../services/video.service'
import type Video from '../../models/video.interface'
import { produce } from 'immer'

export default function useVideos(baseState: Video[]) {
  const state = shallowRef(baseState)

  const isLoading = ref<Boolean>(true)

  function load(loading: boolean): void {
    isLoading.value = loading
  }

  const addVideo = async (url: string): Promise<void> => {
    load(true)
    const response = await videoService.addVideo(url)

    const updater = (videos: Video[]) => {
      videos.push(response.data.bookmark)
    }
    load(false)

    state.value = produce(state.value, updater)
  }

  const getVideos = async (): Promise<void> => {
    const response = await videoService.getVideos()

    const updater = (videos: Video[]) => {
      response.data.forEach((video) => {
        videos.push(video)
      })
    }
    load(false)

    state.value = produce(state.value, updater)
  }

  const getVideoById = async (id: string): Promise<Video | null> => {
    load(true)
    const response = await videoService.getVideoById(id)
    try {
      return response.data
    } catch {
      return null
    } finally {
      load(false)
    }
  }

  const updateVideo = async (input: Video, index: number): Promise<void> => {
    load(true)
    const response = await videoService.updateVideo(input)

    const updater = (videos: Video[]) => {
      videos[index].title = response.data.title
    }
    load(false)

    state.value = produce(state.value, updater)
  }

  const deleteVideo = async (id: string, index: number): Promise<void> => {
    load(true)
    const response = await videoService.deleteVideo(id)
    const updater = (videos: Video[]) => {
      videos[index].title = response.data.title
      videos.splice(index, 1)
    }
    load(false)

    state.value = produce(state.value, updater)
  }

  return [state, isLoading, addVideo, getVideos, updateVideo, deleteVideo, getVideoById] as const
}
