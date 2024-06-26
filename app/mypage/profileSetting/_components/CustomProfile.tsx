'use client'

import style from './styles/pointShop.module.scss'
import CustomResult from './CustomResult'

import { useSearchParams } from '@/node_modules/next/navigation'
import { useState } from 'react'
import AnimalButton from './view/AnimalButton'
import useProfileItemList from '@/app/_hooks/services/queries/profileItemList'
import { avatarItemList, wearingItem } from './types/responseType'
import useGetProfileAvatar from '@/app/_hooks/services/queries/profileAvatar'
import api from '@/app/_api/commonApi'
import EmptyItems from './EmptyItems'

export default function CustomProfile() {
  const defaultAnimal = useSearchParams().get('defaultAnimal')
  const [selectedTab, setSelectedTab] = useState<string | null>(defaultAnimal)
  const [itemList, setItemList] = useState<avatarItemList>([])
  const [wearingItem, setWearingItem] = useState<wearingItem>({
    emoji: undefined,
    background: undefined,
    frame: undefined,
    wallpaper: undefined,
  })
  const [initWearingItem, setInitWearingItem] = useState<wearingItem>({
    emoji: undefined,
    background: undefined,
    frame: undefined,
    wallpaper: undefined,
  })
  const ANIMALTYPE = ['고냥이', '곰돌이', '댕댕이', '폭스']

  const handleTabClick = (animal: string) => {
    setSelectedTab(animal)
  }
  const handleResetClick = () => {
    setWearingItem(initWearingItem)
  }

  const handleApplyClick = async () => {
    const itemIds: number[] = []

    Object.values(wearingItem).map((info: any) => {
      if (info?.id) {
        itemIds.push(info.id)
      }
    })

    try {
      // console.log(itemIds, 'ides')
      //TODO: reactQuery로 변경
      const res = await api.patch('/items/profile', {
        animal: selectedTab,
        itemIds,
      })
      console.log(res, 'success')
    } catch (err) {
      console.log(err, 'err')
    }
  }

  useGetProfileAvatar(selectedTab, setWearingItem, setInitWearingItem)
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
      {itemList.length === 0 ? (
        <EmptyItems animal={selectedTab} />
      ) : (
        <CustomResult
          selectedTab={selectedTab}
          itemList={itemList}
          wearingItem={wearingItem}
          setWearingItem={setWearingItem}
          handleResetClick={handleResetClick}
          handleApplyClick={handleApplyClick}
        />
      )}
    </>
  )
}
