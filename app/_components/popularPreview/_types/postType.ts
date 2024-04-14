import { profileItems } from '../../postPreview/_types/responseType'

export type postProps = {
  profile: {
    isAnonymous: boolean
    image: profileItems | undefined
    name: string
    category: string
    tag: string
    animal: string
  }
  post: {
    id: number
    time: string
    title: string
    content: string
    likes: string[] | null
    comments: number
    views: number
  }
}
