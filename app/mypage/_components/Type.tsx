import style from './styles/type.module.scss'
import { ReactNode } from 'react'
import cs from 'classnames/bind'

type Props = {
  svg: ReactNode
  title: string
  count?: number
  active?: string
}

export default function Type({ svg, title, count, active }: Props) {
  const cx = cs.bind(style)
  return (
    <div className={style.container}>
      <div className={cx('svgContainer', active)}>{svg}</div>
      <div className={style.title}>{title}</div>
      <div className={style.count}>{count}</div>
    </div>
  )
}
