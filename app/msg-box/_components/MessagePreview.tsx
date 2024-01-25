import style from '../styles/messagePreview.module.scss'
import Avatar from '/public/assets/avatar.svg'
export default function MessagePreview({
  messageRoom,
}: {
  messageRoom: object
}) {
  return (
    <article className={style.container}>
      <span className={style.avatar}>
        <Avatar width="48" height="48" />
      </span>
      <div className={style.textDiv}>
        <span className={style.sender}>은하수</span>
        <span className={style.content}>
          엥 여사친이 완전 못된사람이네!! 마짱뜨자 ㅋ 머리채 잡으러
          가즈아아아~~!!
        </span>
      </div>
      <div className={style.informDiv}>
        <span className={style.time}>1분전</span>
        <span className={style.notRead}>3</span>
      </div>
    </article>
  )
}
