import { ReactNode } from 'react'
import style from './header.module.scss'

type headerProps = {
  title?: string
  leftSection?: ReactNode
  rightSection?: ReactNode[]
}
export default function Header({
  title,
  leftSection,
  rightSection,
}: headerProps) {
  return (
    <header className={style.container}>
      <div className={style.titleWrapper}>
        {leftSection}
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.iconWrapper}>
        {rightSection?.map((icons) => {
          return icons
        })}
      </div>
    </header>
  )
}
