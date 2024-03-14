'use client'

import style from './styles/pointShop.module.scss'
import CustomResult from './CustomResult'

import { useSearchParams } from '@/node_modules/next/navigation'
import { useEffect, useState } from 'react'
import AnimalButton from './view/AnimalButton'
import useProfileItemList from '@/app/_hooks/services/queries/profileItemList'
import { avatarItemList, wearingItem } from './types/responseType'
import useGetProfileAvatar from '@/app/_hooks/services/queries/profileAvatar'

export default function CustomProfile() {
  const defaultAnimal = useSearchParams().get('defaultAnimal')
  // const [selectedTab, setSelectedTab] = useState<string | null>(defaultAnimal)
  const [selectedTab, setSelectedTab] = useState<string>('고냥이')
  const [itemList, setItemList] = useState<avatarItemList>([])
  const [wearingItem, setWearingItem] = useState<wearingItem>({
    emoji: undefined,
    background: undefined,
    frame: undefined,
    wallpaper: undefined,
  })
  // const { mutate } = useGetProfileAvatar(selectedTab, setWearingItem)
  const ANIMALTYPE = ['고냥이', '곰돌이', '댕댕이', '폭스']
  const handleTabClick = (animal: string) => {
    setSelectedTab(animal)
  }
  useGetProfileAvatar(selectedTab, setWearingItem)
  useProfileItemList(selectedTab, setItemList)
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
      <CustomResult
        selectedTab={selectedTab}
        itemList={itemList}
        wearingItem={wearingItem}
      />
    </>
  )
}
