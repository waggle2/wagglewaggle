import style from '../styles/messagePreview.module.scss'
import Avatar from '/public/assets/avatar.svg'
import cs from 'classnames/bind'
const cx = cs.bind(style)

interface Props {
  sender?: string
  content?: string
  time?: Date
  receiver?: string
  firstUser?: string
  secondUser?: string
}

export default function MessagePreview({
  sender,
  receiver,
  content,
  time,
  firstUser,
}: Props) {
  return (
    <article
      className={cx(
        'container',
        receiver ? (firstUser === receiver ? null : 'dark') : null,
      )}
    >
      <span className={style.avatar}>
        <Avatar width="48" height="48" />
      </span>
      <div className={style.textDiv}>
        <span className={style.sender}>
          {receiver
            ? firstUser === receiver
              ? '받은 쪽지'
              : '보낸 쪽지'
            : sender}
        </span>
        <span className={style.content}>{content}</span>
      </div>
      <div className={style.informDiv}>
        <span className={style.time}>{time}</span>
        <span className={style.notRead}>3</span>
      </div>
    </article>
  )
}
