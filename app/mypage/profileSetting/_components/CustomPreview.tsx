import style from './styles/pointShop.module.scss'

import { useRecoilValue } from 'recoil'
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState'

type CustomPreviewProps = {
  selectedEmoji: string
  selectedProfileBg: string
  selectedFrame: string
  selectedWallpaper: string
  confirmModalToggle: () => void
  handleResetClick: () => void
}

export default function CustomPreview({
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  selectedWallpaper,

  confirmModalToggle,
  handleResetClick,
}: CustomPreviewProps) {
  const selectedTab = useRecoilValue(selectedTabState)

  return (
    <>
      {/* 선택된 동물 꾸미기 미리보기 */}
      <div className={style.customContainer}>
        {selectedTab && (
          <>
            <div className={style.customBackground}>
              <div className={style.profilePreview}>
                <div className={style.imageContainer}>
                  <div className={style.imageBox}>
                    <img
                      className={style.emoji}
                      src={selectedEmoji}
                      alt={`${selectedEmoji}`}
                    />
                    <img
                      className={style.frame}
                      src={selectedFrame}
                      alt={selectedFrame}
                    />

                    <img
                      className={style.profileBg}
                      src={selectedProfileBg}
                      alt={selectedProfileBg}
                    />
                  </div>
                </div>
                <img
                  className={style.wallPaper}
                  src={selectedWallpaper}
                  alt={selectedWallpaper}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
