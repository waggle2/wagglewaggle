import Link from '@/node_modules/next/link'
import style from './navIcon.module.scss'

import HomeIcon from '@/public/assets/home.svg'
import ActiveHome from '@/public/assets/activeHome.svg'

type props = {
  path: string
}
export default function Home({ path }: props) {
  return (
    <Link href={'/'} className={style.container}>
      <div className={style.background}>
        {path === '/' ? <ActiveHome /> : <HomeIcon />}
      </div>
      <div className={path === '/' ? style.activeTitle : style.title}>홈</div>
    </Link>
  )
}
