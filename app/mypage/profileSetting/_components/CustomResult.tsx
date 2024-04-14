'use client'

import { avatarItemList, wearingItem } from './types/responseType'

import CustomPreview from './CustomPreview'
import ItemSelection from './ItemSelection'
import ApplyProfile from './ApplyProfile'
import style from './styles/pointShop.module.scss'
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
      <div className={style.paddingContainer}>
        <CustomPreview
          animal={selectedTab}
          selectedEmoji={wearingItem?.emoji}
          selectedProfileBg={wearingItem?.background}
          selectedFrame={wearingItem?.frame}
          selectedWallpaper={wearingItem?.wallpaper}
        />
      </div>
      <ItemSelection
        animal={selectedTab}
        wearingItem={wearingItem}
        itemList={itemList}
        setWearingItem={setWearingItem}
      />
      <ApplyProfile
        handleResetClick={handleResetClick}
        handleApplyClick={handleApplyClick}
      />
    </>
  )
}
