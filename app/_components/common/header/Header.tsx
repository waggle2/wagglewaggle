import { ReactNode } from 'react'
import style from './header.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)

type headerProps = {
  title?: string
  leftSection?: ReactNode
  rightSection?: ReactNode[]
  isNoneSidePadding?: boolean
}
export default function Header({
  title,
  leftSection,
  rightSection,
  isNoneSidePadding = false,
}: headerProps) {
  return (
    <header className={cx('container', { nonePadding: isNoneSidePadding })}>
      <div className={style.titleWrapper}>
        <span>{leftSection}</span>
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.iconWrapper}>
        {rightSection?.map((icons, index) => {
          return <span key={index}>{icons}</span>
        })}
      </div>
      <hr className={cx('hr', { nonePadding: isNoneSidePadding })} />
    </header>
  )
}
