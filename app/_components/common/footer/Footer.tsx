'use client'

import { usePathname } from '@/node_modules/next/navigation'
import { useEffect, useState } from 'react'
import style from './footer.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import GreenPuls from './_components/GreenPuls'
import Home from './_components/Home'
import Login from './_components/Login'
import Massage from './_components/Massage'
import MyPage from './_components/MyPage'
import PointShop from './_components/PointShop'
import { useGetAllMessageRooms } from '@/app/_hooks/services/queries/message'

type UnreadMessageCharacterType = {
  size: 'small' | 'medium' | 'large'
  count: number | string
}
export default function Footer() {
  const pathname = usePathname()
  const { data } = useGetAllMessageRooms()

  const isUnreadMessage = !!data?.filter(
    (room: any) => room.unreadMessageCount > 0,
  ).length
  const totalUnreadMessage = () => {
    let count = 0
    data?.forEach((room: any) => {
      count += room.unreadMessageCount
    })
    return count
  }
  const countUnreadMessageCharacter = (): UnreadMessageCharacterType | null => {
    const count = totalUnreadMessage()
    if (count < 10)
      return {
        size: 'small',
        count,
      }
    if (count < 100)
      return {
        size: 'medium',
        count,
      }
    if (count >= 100)
      return {
        size: 'large',
        count: '99+',
      }
    return null
  }
  const [isLogin, setIsLogin] = useState<boolean>()
  useEffect(() => {
    setIsLogin(() => !!localStorage.getItem('isLogin'))
  }, [])

  return (
    <footer className={style.container}>
      <Home path={pathname} />
      <div className={style.messageDiv}>
        <Massage path={pathname} />
        {isUnreadMessage && (
          <span
            className={cx('alarm', countUnreadMessageCharacter()?.size ?? '')}
          >
            {countUnreadMessageCharacter()?.count}
          </span>
        )}
      </div>
      <GreenPuls />
      <PointShop path={pathname} />
      {isLogin ? <MyPage path={pathname} /> : <Login />}
    </footer>
  )
}
