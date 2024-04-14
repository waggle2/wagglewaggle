import Link from '@/node_modules/next/link'
import style from './styles/pointShop.module.scss'

import { avatarItem } from './types/responseType'

type CustomPreviewProps = {
  animal: string | undefined | null
  selectedEmoji?: avatarItem | undefined | null
  selectedProfileBg?: avatarItem | undefined | null
  selectedFrame?: avatarItem | undefined | null
  selectedWallpaper?: avatarItem | undefined | null
  isSetting?: boolean
}

export default function CustomPreview({
  isSetting = false,
  animal,
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  selectedWallpaper,
}: CustomPreviewProps) {
  //TODO:img태그 수정

  return (
    <>
      {/* 선택된 동물 꾸미기 미리보기 */}

      <article className={style.customBackground}>
        <div className={style.profilePreview}>
          {isSetting && (
            <Link
              href={{
                pathname: '/mypage/profileSetting',
                query: { defaultAnimal: `${animal}` },
              }}
              className={style.setting}
            >
              <img src="/assets/setting.svg" alt="navigation profile setting" />
            </Link>
          )}
          <div className={style.imageContainer}>
            <div className={style.imageBox}>
              <div className={style.profileWrapper}>
                <img
                  className={style.emoji}
                  src={
                    selectedEmoji
                      ? selectedEmoji.image
                      : `/assets/point_shop/emoji/${animal}_default.svg`
                  }
                  alt={'selectedEmoji'}
                />
                <img
                  className={style.profileBg}
                  src={
                    selectedProfileBg
                      ? selectedProfileBg.image
                      : `/assets/point_shop/profile_background/${animal}_background_default.svg`
                  }
                  alt={'selectedProfileBg'}
                />
              </div>
              <img
                className={style.frame}
                src={
                  selectedFrame
                    ? selectedFrame.image
                    : '/assets/point_shop/frame/frame_default.svg'
                }
                alt={'selectedFrame'}
              />
            </div>
          </div>
          <img
            className={style.wallPaper}
            src={
              selectedWallpaper
                ? selectedWallpaper.image
                : '/assets/point_shop/wallpaper/wallpaper_default.svg'
            }
            alt={'selectedWallpaper'}
          />
        </div>
      </article>
    </>
  )
}
