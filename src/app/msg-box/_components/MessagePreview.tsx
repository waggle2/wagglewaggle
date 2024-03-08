import { dateAndTime } from '@/app/_lib/formatDate'
import style from '../styles/messagePreview.module.scss'
import cs from 'classnames/bind'
import { MessageUser } from '@/app/_types/messageTypes'
const cx = cs.bind(style)
import Bear from '/public/assets/bear_default.svg'
import Fox from '/public/assets/fox_default.svg'
import Dog from '/public/assets/dog_default.svg'
import Cat from '/public/assets/cat_default.svg'

interface Props {
  sender: string
  content: string
  time: Date
  receiver: string
  firstUser: MessageUser
  secondUser: MessageUser
  type?: 'title' | 'content'
  unreadMessageCount?: number
  loginUserType: 'firstUser' | 'secondUser'
  userId?: string
}

export default function MessagePreview({
  sender,
  content,
  time,
  firstUser,
  secondUser,
  loginUserType,
  type = 'title',
  unreadMessageCount = 0,
  userId = '',
}: Props) {
  const profileAnimal = {
    곰돌이: <Bear />,
    폭스: <Fox />,
    댕댕이: <Dog />,
    고냥이: <Cat />,
  }

  const partnerObject = () => {
    if (loginUserType === 'firstUser') {
      return secondUser
    } else {
      return firstUser
    }
  }

  const isMessageFromMe = () => {
    return userId === sender
  }

  return (
    <article
      className={cx(
        'container',
        type === 'content' && isMessageFromMe() && 'dark',
      )}
    >
      <span className={style.avatar}>
        {type === 'title' && profileAnimal[partnerObject().profileAnimal]}
        {type === 'content' &&
          (loginUserType === 'firstUser'
            ? profileAnimal[firstUser.profileAnimal]
            : profileAnimal[secondUser.profileAnimal])}
      </span>
      <div className={style.contentDiv}>
        {type === 'title' && (
          <span className={style.sender}>{partnerObject().nickname}</span>
        )}
        {type === 'content' &&
          (isMessageFromMe() ? (
            <span className={style.sender}>보낸 쪽지</span>
          ) : (
            <span className={style.sender}>받은 쪽지</span>
          ))}
        <div className={style.informDiv}>
          <span className={style.time}>{dateAndTime(time)}</span>
        </div>
        <div className={style.contentAndCountDiv}>
          <span className={cx('content', type === 'title' && 'title')}>
            {content}
          </span>
          {unreadMessageCount === 0 ? null : (
            <span className={style.notRead}>{unreadMessageCount}</span>
          )}
        </div>
      </div>
    </article>
  )
}
