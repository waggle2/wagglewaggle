import style from '../styles/message.module.scss'
import Avatar from '/public/assets/avatar.svg'

type Message = {
  content: string
  sender: string
  createdAt: string
}

export default function Message({ message }: { message: Message }) {
  return (
    <article className={style.container}>
      <span className={style.avatarSpan}>
        <Avatar width="48" height="48" />
      </span>
      <div className={style.textDiv}>
        <span className={style.sender}>{message.sender}</span>
        <span className={style.time}>2024-01-12 09:2 PM</span>
        <span className={style.content}>{message.content}</span>
      </div>
    </article>
  )
}
