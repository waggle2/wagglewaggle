import { ReactNode } from 'react'

import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'

type props = { children: ReactNode }

export default function FeedbackLayout({ children }: props) {
  return (
    <>
      <Header leftSection={<Back />} title="건의사항" />
      {children}
    </>
  )
}
