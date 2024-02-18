'use client'

import SwitchStep from './_components/SwitchStep'
import { useState } from 'react'
import style from './styles/page.module.scss'
import { IInputFileds } from '@/app/_types/userFormTypes'
export default function page() {
  const [userTotalDatas, setUserTotalDatas] = useState<IInputFileds>({})

  return (
    <div className={style.container}>
      <SwitchStep
        userTotalDatas={userTotalDatas}
        setUserTotalDatas={setUserTotalDatas}
      />
    </div>
  )
}
