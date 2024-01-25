import style from '../styles/messagePreview.module.scss'

export default function MessagePreview({
  messageRoom,
}: {
  messageRoom: object
}) {
  return (
    <article className={style.container}>
      <span className={style.avatar}></span>
      <div className={style.textDiv}>
        <span className={style.sender}>은하수</span>
        <span className={style.content}>여사친이 완전 못된 사람이네!!</span>
      </div>
      <div className={style.informDiv}>
        <span className={style.time}>1분전</span>
        <span className={style.notRead}>3</span>
      </div>
    </article>
  )
}
