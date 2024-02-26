import { ReactNode } from 'react'

type props = { children: ReactNode; logoutModal: ReactNode }

export default function MyPageLayout({ children, logoutModal }: props) {
  return (
    <>
      {children}
      {logoutModal}
    </>
  )
}
