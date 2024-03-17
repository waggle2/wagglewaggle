interface IVote {
  postId: number
  title: string
  items: {
    content: string
  }[]
  endedDate: string
}
