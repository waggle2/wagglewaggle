'use client'

import style from './profileSetting.module.scss'
import { useEffect, useState } from 'react'
import CustomResult from './CustomContainer'

export default function CustomProfile() {
  const [selectedTab, setSelectedTab] = useState('cat')

  const handleTabClick = (animal: string) => {
    setSelectedTab(animal)
  }

  const tabButtonStyle = (animal: string) => {
    return selectedTab === animal
      ? `${style.tabButton} ${style.active}`
      : style.tabButton
  }

  return (
    <>
      {/* 동물 선택 탭 */}
      <div className={style.tabContainer}>
        <button
          className={tabButtonStyle('cat')}
          onClick={() => handleTabClick('cat')}
        >
          고냥이
        </button>
        <button
          className={tabButtonStyle('bear')}
          onClick={() => handleTabClick('bear')}
        >
          곰돌이
        </button>
        <button
          className={tabButtonStyle('dog')}
          onClick={() => handleTabClick('dog')}
        >
          댕댕이
        </button>
        <button
          className={tabButtonStyle('fox')}
          onClick={() => handleTabClick('fox')}
        >
          폭스
        </button>
      </div>

      {/* 동물 꾸미기 */}
      <CustomResult selectedTab={selectedTab} />
    </>
  )
}
