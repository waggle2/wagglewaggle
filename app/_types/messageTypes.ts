export interface IMessageRooms {
  id: number
  firstUser: MessageUser
  secondUser: MessageUser
  messages: Messages[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  unreadMessageCount?: number
  isBlockedUser?: boolean
  leaveRoom?: string[]
}

export type Messages = {
  id: number
  messageRoomId: number
  sender: string
  receiver: string
  content: string
  isRead: boolean
  createdAt: string
  deletedAt: string | null
}

export type MessageUser = {
  id?: string
  nickname: string
  profileAnimal: string
  profileItems?: Array<any>
}

export type IPostMessage = {
  receiver: string
  content: string
}

export type IReportMessageRequestBody = {
  reason: string
  content: string
  messageRoomId: string
}
