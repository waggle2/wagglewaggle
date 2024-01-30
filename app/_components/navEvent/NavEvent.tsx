import Link from '@/node_modules/next/link'
import { ReactNode } from 'react'
import style from './navEvent.module.scss'

type props = {
  href: string
  img: ReactNode
}

export default function NavEvent({ href, img }: props) {
  return (
    <Link href={href} className={style.container}>
      {img}
    </Link>
  )
}
