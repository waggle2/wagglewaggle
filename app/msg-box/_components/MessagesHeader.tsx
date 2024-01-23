import style from './styles/messagesHeader.module.scss'
import Image from 'next/image'

export default function MessagesHeader() {
  return (
    <div className={style.headerDiv}>
      <span className={style.iconSpan}>
        <Image src="/arrow-left.svg" alt="back" width={24} height={24} />
      </span>
      <span>은하수</span>
      <span className={style.iconSpan}>
        <Image
          src="/icon-hamburger.svg"
          alt="menu"
          className={style.menu}
          width={3}
          height={15}
        />
      </span>
    </div>
  )
}
