'use client'
import style from '../styles/messagesHeader.module.scss'
import cs from 'classnames/bind'
import LeftArrow from '/public/assets/leftArrow.svg'
import Dots from '/public/assets/dots.svg'
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
        <LeftArrow width={24} height={24} className={style.leftArrow} />
      </span>
      <span>은하수</span>
      <span
        className={cx('menuIcon')}
        onClick={() => setMenuModalOpen(!isMenuModalOpen)}
      >
        <Dots width={3} height={15} className={style.menu} />
      </span>
    </div>
  )
}
