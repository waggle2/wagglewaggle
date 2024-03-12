'use client'

import { useEffect, useState } from 'react'
import { avatarItemList } from './types/responseType'
import CustomPreview from './CustomPreview'

import ItemSelection from './ItemSelection'

import api from '@/app/_api/commonApi'

type Props = {
  selectedTab: string
  itemList: avatarItemList
}

export default function CustomResult({ selectedTab, itemList }: Props) {
  const [selectedItemType, setSelectedItemType] = useState('이모지')
  const ITEMTYPE = ['이모지', '프로필 배경', '프레임', '벽지']
  return (
    <>
      {/* <CustomPreview
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        confirmModalToggle={confirmModalToggle}
        handleResetClick={handleResetClick}
      />

      <ItemSelection
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
