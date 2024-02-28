export interface IMessageRooms {
  id: number
  leaveRoom: Array<string>
  firstUser: MessageUser
  secondUser: MessageUser
  messages: Messages[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  unreadMessageCount: number
}

export type Messages = {
  id: string
  sender: string
  receiver: string
  content: string
  isRead: boolean
  createdAt: Date
}

export type MessageUser = {
  id: string
  nickname: string
  profileAnimal: '곰돌이'
  profileItems: Array<any>
}

export type IPostMessage = {
  receiver: string
  content: string
}
