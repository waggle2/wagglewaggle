interface IVote {
  postId: number
  title: string
  items: {
    content: string
  }[]
  endedDate: string
}
interface IModifyVote {
  voteId: number
  title: string
  endedAt: string
  createPollItemDtos: {
    content: string
  }[]
  deletePollItemIds: number[]
}
