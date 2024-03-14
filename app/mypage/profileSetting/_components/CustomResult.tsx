'use client'

import { avatarItemList, wearingItem } from './types/responseType'

import dynamic from 'next/dynamic'

type Props = {
  selectedTab: string | undefined | null
  wearingItem: wearingItem
  itemList: avatarItemList
}

export default function CustomResult({
  selectedTab,
  itemList,
  wearingItem,
}: Props) {
  const CustomPreview = dynamic(async () => await import('./CustomPreview'), {
    ssr: false,
  })
  const ItemSelection = dynamic(async () => await import('./ItemSelection'), {
    ssr: false,
  })
  return (
    <>
      <CustomPreview
        animal={selectedTab}
        selectedEmoji={wearingItem?.emoji}
        selectedProfileBg={wearingItem?.background}
        selectedFrame={wearingItem?.frame}
        selectedWallpaper={wearingItem?.wallpaper}
      />
      <ItemSelection wearingItem={wearingItem} itemList={itemList} />
    </>
  )
}
