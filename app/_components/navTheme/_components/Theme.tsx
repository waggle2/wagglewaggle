import Link from '@/node_modules/next/link'
import style from './theme.module.scss'
import { ReactNode } from 'react'

type Props = {
  href:
    | string
    | { pathname: string; query?: { category?: string; title: string } }
  svg: ReactNode
  title: string
  bgColor?: string
}

export default function Theme({ href, svg, title, bgColor }: Props) {
  return (
    <Link href={href} className={style.container} key={title}>
      <label className={style.background} style={{ backgroundColor: bgColor }}>
        {svg}
      </label>
      <div className={style.title}>{title}</div>
    </Link>
  )
}
