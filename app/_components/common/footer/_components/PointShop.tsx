import Link from '@/node_modules/next/link'
import style from './navIcon.module.scss'

import PointShopIcon from '@/public/assets/pointShop.svg'
import ActivePointShop from '@/public/assets/activePointShop.svg'

type props = {
  path: string
}
export default function PointShop({ path }: props) {
  return (
    <Link href={'http://localhost:3000/pointshop'} className={style.container}>
      <div className={style.background}>
        {path.includes('/pointshop') ? <ActivePointShop /> : <PointShopIcon />}
      </div>
      <div
        className={
          path.includes('/pointshop') ? style.activeTitle : style.title
        }
      >
        포인트샵
      </div>
    </Link>
  )
}