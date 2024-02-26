'use client'

import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import { messageRooms, IMessageRooms } from '../mockTalk'
import Link from 'next/link'
import EmptyRooms from './EmptyRooms'
import { useEffect, useState } from 'react'
import { useGetAllMessageRooms } from '@/app/_hooks/services/queries/msgBox'
import { messageRoom } from '@/app/_lib/messages'
import PaddingProvider from '@/app/_components/layoutSupport/PaddingProvider'

export default function MessageRooms() {
  const { data, isLoading, isError } = useGetAllMessageRooms()

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
            {data.map((roomData: messageRoom, index: number) => {
              const lastMessage = data[index].messages.at(-1)
              return (
                <Link href={`msg-box/${index}`} key={index}>
                  <MessagePreview
                    sender={lastMessage.sender}
                    content={lastMessage.content}
                    time={lastMessage.created_at}
                    firstUser={lastMessage.first_user}
                    secondUser={lastMessage.second_user}
                    receiver={lastMessage.receiver}
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
