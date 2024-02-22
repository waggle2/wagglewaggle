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
  const [roomsData, setRoomsData] = useState<Array<messageRoom | undefined>>([])
  const { data, isLoading, isError } = useGetAllMessageRooms()

  useEffect(() => {
    console.log(data)
    if (data) {
      console.log(data)
    }
  }, [])

  return (
    <>
      {roomsData?.length === 0 ? (
        <EmptyRooms />
      ) : (
        <div className={style.roomsDiv}>
          {roomsData.map((roomData: messageRoom, index) => (
            <Link href={`msg-box/${index}`} key={index}>
              <MessagePreview
                sender={roomsData[index]?.messages.at(-1)?.sender}
                content={roomsData[index]?.messages.at(-1)?.content}
                time={roomsData[index]?.messages.at(-1)?.created_at}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
