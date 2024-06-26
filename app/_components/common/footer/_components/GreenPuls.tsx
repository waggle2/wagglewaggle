import Link from '@/node_modules/next/link'
import style from './navIcon.module.scss'

import GreenPulsIcon from '@/public/assets/greenPlus.svg'

export default function GreenPuls() {
  return (
    <Link href={'/write'} className={style.container}>
      <div className={style.background}>
        <GreenPulsIcon />
      </div>
    </Link>
  )
}
