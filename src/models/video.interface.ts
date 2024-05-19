import type Bookmark from './Bookmark.interface'

export default interface Video extends Bookmark {
  width: number
  height: number
  duration: number
}
