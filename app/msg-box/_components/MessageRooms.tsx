'use client'

import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms, IMessageRooms } from '../mockTalk'
import Link from 'next/link'
import EmptyRooms from './EmptyRooms'
import { useEffect } from 'react'
import { useGetAllMessageRooms } from '@/app/_hooks/services/queries/msgBox'

export default function MessageRooms() {
  const { data, isLoading } = useGetAllMessageRooms()

  if (isLoading) return <div>로딩중...</div>

  console.log(data, '야호')
  return

  return (
    <>
      {messageRooms?.length === 0 ? (
        <EmptyRooms />
      ) : (
        <div className={style.roomsDiv}>
          {messageRooms.map((messageRoom: IMessageRooms, index) => (
            <Link href={`msg-box/${index}`} key={index}>
              <MessagePreview
                sender={messageRooms[index]?.messages.at(-1)?.sender}
                content={messageRooms[index]?.messages.at(-1)?.content}
                time={messageRooms[index]?.messages.at(-1)?.createdAt}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
