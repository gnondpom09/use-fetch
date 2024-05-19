import type Video from '../models/video.interface'
import http from './axios'

async function addVideo(url: string) {
  return await http.post('videos', { url })
}

async function getVideos() {
  return await http.get<Video[]>('videos')
}

async function getVideoById(id: string) {
  return await http.get<Video>(`videos/${id}`)
}

async function updateVideo(video: Video) {
  const id = video._id
  return await http.put(`videos/${id}`, video)
}

async function deleteVideo(id: string) {
  return await http.delete(`videos/${id}`)
}

export default {
  addVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo
}
