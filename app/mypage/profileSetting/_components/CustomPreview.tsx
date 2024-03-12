import style from './styles/pointShop.module.scss'

import { useRecoilValue } from 'recoil'
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState'
import { avatarItem } from './types/responseType'

type CustomPreviewProps = {
  animal: string | null
  selectedEmoji?: avatarItem
  selectedProfileBg?: avatarItem
  selectedFrame?: avatarItem
  selectedWallpaper?: avatarItem
}

export default function CustomPreview({
  animal,
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  selectedWallpaper,
}: CustomPreviewProps) {
  return (
    <>
      {/* 선택된 동물 꾸미기 미리보기 */}
      <div className={style.customContainer}>
        <div className={style.customBackground}>
          <div className={style.profilePreview}>
            <div className={style.imageContainer}>
              <div className={style.imageBox}>
                {
                  //TODO:img태그 수정
                }
                <img
                  className={style.emoji}
                  src={
                    selectedEmoji
                      ? selectedEmoji.image
                      : `/assets/point_shop/emoji/${animal}/${animal}_default.svg`
                  }
                  alt={'selectedEmoji'}
                />

                <img
                  className={style.frame}
                  src={
                    selectedFrame
                      ? selectedFrame.image
                      : '/assets/point_shop/frame/프레임샘플.png'
                  }
                  alt={'selectedFrame'}
                />

                <img
                  className={style.profileBg}
                  src={
                    selectedProfileBg
                      ? selectedProfileBg.image
                      : '/assets/point_shop/profile_background/프로필배경1.svg'
                  }
                  alt={'selectedProfileBg'}
                />
              </div>
            </div>
            <img
              className={style.wallPaper}
              src={
                selectedWallpaper
                  ? selectedWallpaper.image
                  : '/assets/point_shop/wallpaper/벽지기본.png'
              }
              alt={'selectedWallpaper'}
            />
          </div>
        </div>
      </div>
    </>
  )
}
