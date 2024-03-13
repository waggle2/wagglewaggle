'use client'

import { useState } from 'react'
import { avatarItemList, wearingItem } from './types/responseType'
import CustomPreview from './CustomPreview'

import ItemSelection from './ItemSelection'

type Props = {
  selectedTab: string | null
  wearingItem?: wearingItem
  itemList: avatarItemList
}

export default function CustomResult({
  selectedTab,
  itemList,
  wearingItem,
}: Props) {
  return (
    <>
      <CustomPreview
        animal={selectedTab}
        selectedEmoji={wearingItem?.emoji}
        selectedProfileBg={wearingItem?.background}
        selectedFrame={wearingItem?.frame}
        selectedWallpaper={wearingItem?.wallpaper}
      />

      <ItemSelection
        // handleCategoryClick={handleCategoryClick}
        // items={items}
        // handleItemClick={handleItemClick}
        // handleRemoveItemClick={handleRemoveItemClick}
        // selectedItems={cartData.cartItems}

        // possessionItems={possessionItems}
        itemList={itemList}
      />
    </>
  )
}
