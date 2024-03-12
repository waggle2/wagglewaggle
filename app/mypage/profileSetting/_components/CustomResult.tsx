'use client'

import { useEffect, useState } from 'react'
import { avatarItemList, wearingItem } from './types/responseType'
import CustomPreview from './CustomPreview'

import ItemSelection from './ItemSelection'

import api from '@/app/_api/commonApi'

type Props = {
  selectedTab: string
  wearingItem?: wearingItem
  itemList: avatarItemList
}

export default function CustomResult({
  selectedTab,
  itemList,
  wearingItem,
}: Props) {
  const [selectedItemType, setSelectedItemType] = useState('이모지')
  const ITEMTYPE = ['이모지', '프로필 배경', '프레임', '벽지']
  return (
    <>
      <CustomPreview
        animal={selectedTab}
        selectedEmoji={wearingItem?.emoji}
        selectedProfileBg={wearingItem?.background}
        selectedFrame={wearingItem?.frame}
        selectedWallpaper={wearingItem?.wallpaper}
      />

      {/* <ItemSelection
        handleCategoryClick={handleCategoryClick}
        items={items}
        handleItemClick={handleItemClick}
        handleRemoveItemClick={handleRemoveItemClick}
        selectedItems={cartData.cartItems}
        isLoading={isLoading}
        possessionItems={possessionItems}
      /> */}
    </>
  )
}
