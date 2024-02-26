'use client'

import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import Link from 'next/link'
import EmptyRooms from './EmptyRooms'
import { useEffect } from 'react'
import { useGetAllMessageRooms } from '@/app/_hooks/services/queries/msgBox'
import { messageRoom } from '@/app/_lib/messages'
import PaddingProvider from '@/app/_components/layoutSupport/PaddingProvider'
import { IMessageRooms, Messages } from '@/app/_types/messageTypes'

export default function MessageRooms() {
  const { data, isLoading, isError } = useGetAllMessageRooms()

  useEffect(() => {
    console.log(data)
  }, [data])

  if (isLoading) return <div>로딩중</div>

  return (
    <>
      {data?.length === 0 ? (
        <>
          <EmptyRooms />
        </>
      ) : (
        <div className={style.roomsDiv}>
          <PaddingProvider>
            {data.map((room: IMessageRooms) => {
              const lastMessage = room.messages.at(-1) as Messages
              return (
                <Link href={`msg-box/${room.id}`} key={room.id}>
                  <MessagePreview
                    sender={lastMessage.sender}
                    content={lastMessage.content}
                    time={lastMessage.createdAt}
                    firstUser={room.firstUser}
                    secondUser={room.secondUser}
                    receiver={lastMessage.sender}
                    unreadMessageCount={room.unreadMessageCount}
                  />
                </Link>
              )
            })}
          </PaddingProvider>
        </div>
      )}
    </>
  )
}
