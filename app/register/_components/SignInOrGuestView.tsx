import Link from 'next/link'
import style from '../styles/signInOrGuestView.module.scss'
export default function SignInOrGuestView() {
  return (
    <ul className={style.list}>
      <li>
        <Link href="/login">회원 로그인</Link>
      </li>
      <li>비회원 구경하기</li>
    </ul>
  )
}
