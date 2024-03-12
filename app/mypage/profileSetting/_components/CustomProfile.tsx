'use client'

import style from './styles/pointShop.module.scss'
import CustomResult from './CustomResult'

import { useSearchParams } from '@/node_modules/next/navigation'
import { useState } from 'react'
import AnimalButton from './view/AnimalButton'

export default function CustomProfile() {
  const [selectedItemType, setSelectedItemType] = useState('이모지')
  const defaultAnimal = useSearchParams().get('defaultAnimal')
  const [selectedTab, setSelectedTab] = useState(defaultAnimal)

  const ITEMTYPE = ['이모지', '프로필 배경', '프레임', '벽지']
  const ANIMALTYPE = ['고냥이', '곰돌이', '댕댕이', '폭스']

  const handleTabClick = (animal: string) => {
    setSelectedTab(animal)
    console.log(defaultAnimal, 'defaultAnimal')
  }

  return (
    <>
      {/* 동물 선택 탭 */}
      <div className={style.tabContainer}>
        {ANIMALTYPE.map((animalType) => (
          <AnimalButton
            key={animalType}
            selectedTab={selectedTab}
            animalType={animalType}
            handleTabClick={handleTabClick}
          />
        ))}
      </div>
      {/* 아이템 및 동물 코인 정보를 CustomResult 컴포넌트에 전달 */}
      {/* <CustomResult
        selectedTab={selectedTab}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
      /> */}
    </>
  )
}
