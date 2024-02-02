'use client'

import { IInputValues } from '@/app/_lib/validate'
import SwitchStep from './_components/SwitchStep'
import { useEffect, useState } from 'react'

export default function page() {
  const [userTotalDatas, setUserTotalDatas] = useState<IInputValues>({})

  return (
    <SwitchStep
      userTotalDatas={userTotalDatas}
      setUserTotalDatas={setUserTotalDatas}
    />
  )
}
