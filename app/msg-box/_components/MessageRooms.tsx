'use client'

import style from '../styles/messageRooms.module.scss'
import MessagePreview from './MessagePreview'
import Link from 'next/link'
import EmptyRooms from './EmptyRooms'
import { useGetAllMessageRooms } from '@/app/_hooks/services/queries/message'
import PaddingProvider from '@/app/_components/layoutSupport/PaddingProvider'
import { IMessageRooms, Messages } from '@/app/_types/messageTypes'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QueryClient } from '@tanstack/react-query'

export default function MessageRooms() {
  const { data: rooms, isLoading } = useGetAllMessageRooms()
  const { data: userData, isLoading: userLoading } = useGetUserInfo()
  const [filteredRooms, setFilteredRooms] = useState<IMessageRooms[]>([])

  const router = useRouter()

  useEffect(() => {
    if (rooms && userData) {
      setFilteredRooms(
        rooms.filter(
          (room: IMessageRooms) => !room.leaveRoom?.includes(userData?.id),
        ),
      )
    }
  }, [rooms, userData])
  if (isLoading) return <div>로딩중</div>
  if (userLoading) return <div>로딩중</div>

  return (
    <>
      {filteredRooms?.length === 0 ? (
        <>
          <EmptyRooms />
        </>
      ) : (
        <PaddingProvider>
          <div className={style.roomsDiv}>
            {filteredRooms?.map((room: IMessageRooms) => {
              const lastMessage = room.messages.at(-1) as Messages
              if (lastMessage === undefined) return
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
                    loginUserType={
                      userData.id === room.firstUser.id
                        ? 'firstUser'
                        : 'secondUser'
                    }
                  />
                </Link>
              )
            })}
          </div>
        </PaddingProvider>
      )}
    </>
  )
}
