import style from './styles/type.module.scss'
import { ReactNode } from 'react'

type Props = {
  svg: ReactNode
  title: string
  count: number
  active?: boolean
}

export default function Type({ svg, title, count, active }: Props) {
  return (
    <div className={style.container}>
      <div
        className={style.svgContainer}
        style={{ backgroundColor: `${active ? '#2FD714' : '#e4e4e4'}` }}
      >
        {svg}
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.count}>{count}</div>
    </div>
  )
}
