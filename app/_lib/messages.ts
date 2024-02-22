export type messages = {
  id: number
  message_room: number
  sender: string
  receiver: string
  content: string
  is_read: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

const messages = {
  id: 11,
  message_room: 1,
  sender: '강인',
  receiver: '흥민',
  content: '형 미안해',
  is_read: false,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}

export type messageRoom = {
  id: number
  first_user: string
  second_user: string
  messages: Array<typeof messages>
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export const messagesRoom = {
  id: 1,
  first_user: '강인',
  second_user: '흥민',
  messages: [messages],
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
}
