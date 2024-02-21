'use client'

import { useState } from 'react'
import SwitchStep from '@/app/_components/userForm/SwitchStep'
import style from './styles/page.module.scss'

export default function page() {
  const [userTotalDatas, setUserTotalDatas] = useState({})

  return (
    <div className={style.container}>
      <SwitchStep
        type="resetPassword"
        userTotalDatas={userTotalDatas}
        setUserTotalDatas={setUserTotalDatas}
      />
    </div>
  )
}
