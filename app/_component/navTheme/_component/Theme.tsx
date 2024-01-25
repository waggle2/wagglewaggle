import Link from '@/node_modules/next/link'
import style from './theme.module.css'
import { ReactNode } from 'react'

type Props = {
  href: string
  svg: ReactNode
  title: string
  bgColor?: string
}

export default function Theme({ href, svg, title, bgColor }: Props) {
  return (
    <Link href={href} className={style.container} key={title}>
      <div className={style.background} style={{ backgroundColor: bgColor }}>
        {svg}
      </div>
      <div className={style.title}>{title}</div>
    </Link>
  )
}
