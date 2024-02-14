export type postProps = {
  profile: {
    image: string
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
    likes: number
    comments: number
    views: number
  }
}
