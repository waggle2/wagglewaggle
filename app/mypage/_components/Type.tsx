import style from './type.module.scss'
import { ReactNode } from 'react'

type Props = {
  svg: ReactNode
  title: string
  count: number
}

export default function Type({ svg, title, count }: Props) {
  return (
    <div className={style.container}>
      <div className={style.svgContainer}>
        {svg}
        <div className={style.count}>{count}</div>
      </div>
      <div className={style.title}>{title}</div>
    </div>
  )
}
