import { ReactNode } from 'react'
import style from './infoModify.module.scss'
export default function InfoModifyLayout({
  children,
  header,
}: {
  children: ReactNode
  header: ReactNode
}) {
  return (
    <>
      {header}
      <div className={style.container}>{children}</div>
    </>
  )
}
