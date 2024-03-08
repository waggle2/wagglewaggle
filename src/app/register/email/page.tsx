'use client'

import { useState } from 'react'
import style from './styles/page.module.scss'
import { IInputFileds } from '@/app/_types/userFormTypes'
import SwitchStep from '@/app/_components/userForm/SwitchStep'
export default function page() {
  const [userTotalDatas, setUserTotalDatas] = useState<IInputFileds>({})

  return (
    <div className={style.container}>
      <SwitchStep
        type="email"
        userTotalDatas={userTotalDatas}
        setUserTotalDatas={setUserTotalDatas}
      />
    </div>
  )
}
