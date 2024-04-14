import Link from 'next/link'
import style from '../styles/guestView.module.scss'
export default function GuestView() {
  return (
    <div className={style.linkDiv}>
      <Link href="/">둘러보기</Link>
    </div>
  )
}
