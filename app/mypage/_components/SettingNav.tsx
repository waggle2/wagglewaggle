import style from './settingNav.module.scss'
import Next from '@/public/assets/next.svg'
import Link from '@/node_modules/next/link'
type props = {
  title: string
  nickName?: string
  href: string
}

export default function SettingNav({ nickName, href, title }: props) {
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={style.navWrapper}>
        <Link href={href} className={style.nick}>
          {nickName}
          <Next />
        </Link>
      </div>
    </div>
  )
}
