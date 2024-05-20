import { shallowRef } from 'vue'
import videoService from '../services/video.service'
import type Video from '../models/video.interface'
import { produce } from 'immer'

export default function useVideos(baseState: Video[]) {
  const state = shallowRef(baseState)

  const addVideo = async (url: string): Promise<void> => {
    const response = await videoService.addVideo(url)

    const updater = (videos: Video[]) => {
      videos.push(response.data.bookmark)
    }

    state.value = produce(state.value, updater)
  }

  const getVideos = async (): Promise<void> => {
    const response = await videoService.getVideos()

    const updater = (videos: Video[]) => {
      response.data.forEach((video) => {
        videos.push(video)
      })
    }

    state.value = produce(state.value, updater)
  }

  const getVideoById = async (id: string): Promise<Video | null> => {
    const response = await videoService.getVideoById(id)
    try {
      return response.data
    } catch {
      return null
    }
  }

  const updateVideo = async (input: Video, index: number): Promise<void> => {
    const response = await videoService.updateVideo(input)

    const updater = (videos: Video[]) => {
      videos[index].title = response.data.title
    }

    state.value = produce(state.value, updater)
  }

  const deleteVideo = async (id: string, index: number): Promise<void> => {
    const response = await videoService.deleteVideo(id)
    const updater = (videos: Video[]) => {
      videos[index].title = response.data.title
      videos.splice(index, 1)
    }

    state.value = produce(state.value, updater)
  }

  return [state, addVideo, getVideos, updateVideo, deleteVideo, getVideoById] as const
}
