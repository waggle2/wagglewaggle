import { dateAndTime } from '@/app/_lib/formatDate'
import style from '../styles/messagePreview.module.scss'
import Avatar from '/public/assets/avatar.svg'
import cs from 'classnames/bind'
import useGetUserInfo from '@/app/_hooks/services/queries/userInfo'
import { useEffect, useState } from 'react'
import { MessageUser } from '@/app/_types/messageTypes'
const cx = cs.bind(style)

interface Props {
  sender: string
  content: string
  time: Date
  receiver: string
  firstUser: MessageUser
  secondUser: MessageUser
  type?: 'title' | 'content'
  unreadMessageCount: number
}

export default function MessagePreview({
  sender,
  receiver,
  content,
  time,
  firstUser,
  secondUser,
  type = 'title',
}: Props) {
  const { data } = useGetUserInfo()
  const [isSameMeWithFirstUser, setSameMeWithFirstUser] = useState(false)
  useEffect(() => {
    if (data) {
      if (data.id === firstUser?.id) {
        setSameMeWithFirstUser(true)
      }
    }
  }, [data])

  const partnerObject = () => {
    if (isSameMeWithFirstUser) {
      return secondUser
    } else {
      return firstUser
    }
  }

  return (
    <article className={cx('container')}>
      <span className={style.avatar}>
        <Avatar width="48" height="48" />
      </span>
      <div className={style.textDiv}>
        <span className={style.sender}>{partnerObject().nickname}</span>
        <span className={style.content}>{content}</span>
      </div>
      <div className={style.informDiv}>
        <span className={style.time}>{dateAndTime(time)}</span>
        <span className={style.notRead}>3</span>
      </div>
    </article>
  )
}
