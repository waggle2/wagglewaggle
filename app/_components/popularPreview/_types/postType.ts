export type postProps = {
  profile: {
    isAnonymous: boolean
    image: any[]
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
