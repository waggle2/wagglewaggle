import Link from '@/node_modules/next/link'
import style from './navIcon.module.scss'

import Msg from '@/public/assets/msg.svg'
import ActiveMsg from '@/public/assets/activeMsg.svg'

type props = {
  path: string
}
export default function Massage({ path }: props) {
  return (
    <Link href={'./msg-box'} className={style.container}>
      <div className={style.background}>
        {path.includes('msg-box') ? <ActiveMsg /> : <Msg />}
      </div>
      <div
        className={path.includes('msg-box') ? style.activeTitle : style.title}
      >
        쪽지
      </div>
    </Link>
  )
}
