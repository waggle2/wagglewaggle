import Link from '@/node_modules/next/link'
import style from './navIcon.module.scss'

import MyPageIcon from '@/public/assets/myPage.svg'
import ActiveMyPage from '@/public/assets/activeMyPage.svg'

type props = {
  path: string
}
export default function MyPage({ path }: props) {
  return (
    <Link href={'/mypage'} className={style.container} scroll={false}>
      <div className={style.background}>
        {path.includes('/mypage') ? <ActiveMyPage /> : <MyPageIcon />}
      </div>
      <div
        className={path.includes('/mypage') ? style.activeTitle : style.title}
      >
        MY
      </div>
    </Link>
  )
}
