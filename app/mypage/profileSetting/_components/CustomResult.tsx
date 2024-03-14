'use client'

import { avatarItemList, wearingItem } from './types/responseType'

import CustomPreview from './CustomPreview'
import ItemSelection from './ItemSelection'

type Props = {
  selectedTab: string | undefined | null
  wearingItem: wearingItem
  itemList: avatarItemList
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>
}

export default function CustomResult({
  selectedTab,
  itemList,
  wearingItem,
  setWearingItem,
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
        wearingItem={wearingItem}
        itemList={itemList}
        setWearingItem={setWearingItem}
      />
    </>
  )
}
