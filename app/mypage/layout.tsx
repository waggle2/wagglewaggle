import { ReactNode } from 'react'

type props = {
  children: ReactNode
  modal: ReactNode
}

export default function Layout({ children, modal }: props) {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
