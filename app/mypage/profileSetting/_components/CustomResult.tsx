'use client'

import { avatarItemList, wearingItem } from './types/responseType'

import CustomPreview from './CustomPreview'
import ItemSelection from './ItemSelection'
import Apply from './Apply'

type Props = {
  selectedTab: string | undefined | null
  wearingItem: wearingItem
  itemList: avatarItemList
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>
  handleResetClick: () => void
  handleApplyClick: () => void
}

export default function CustomResult({
  selectedTab,
  itemList,
  wearingItem,
  setWearingItem,
  handleResetClick,
  handleApplyClick,
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
      <Apply
        handleResetClick={handleResetClick}
        handleApplyClick={handleApplyClick}
      />
    </>
  )
}
