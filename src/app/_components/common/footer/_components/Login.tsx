import Link from 'next/link'
import style from './navIcon.module.scss'

import MyPageIcon from '/public/assets/myPage.svg'

export default function Login() {
  return (
    <Link
      href={'http://localhost:3000/login'}
      className={style.container}
      scroll={false}
    >
      <div className={style.background}>
        <MyPageIcon />
      </div>
      <div className={style.title}>로그인</div>
    </Link>
  )
}
