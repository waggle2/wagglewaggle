import { ReactNode } from 'react'
import style from './history.module.scss'
export default function HistoryLayout({
  children,
  header,
}: {
  children: ReactNode
  header: ReactNode
}) {
  return (
    <>
      {header}
      <div className={style.postContainer}>{children}</div>
    </>
  )
}
