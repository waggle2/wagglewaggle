'use client'
import Link from 'next/link'
import style from './styles/messagesHeader.module.scss'
import Image from 'next/image'
import cs from 'classnames/bind'
import { useRouter } from 'next/navigation'
const cx = cs.bind(style)

export default function MessagesHeader({
  isMenuModalOpen,
  setMenuModalOpen,
}: {
  isMenuModalOpen: boolean
  setMenuModalOpen: (isOpen: boolean) => void
}) {
  const router = useRouter()
  return (
    <div className={style.headerDiv}>
      <span className={style.iconSpan} onClick={() => router.back()}>
        <Image src="/arrow-left.svg" alt="back" width={24} height={24} />
      </span>
      <span>은하수</span>
      <span
        className={cx('iconSpan', 'menuIcon')}
        onClick={() => setMenuModalOpen(!isMenuModalOpen)}
      >
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
