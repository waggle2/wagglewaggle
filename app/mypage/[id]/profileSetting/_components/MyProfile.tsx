import Link from '@/node_modules/next/link'
import style from './styles/profileSetting.module.scss'

type CustomPreviewProps = {
  selectedEmoji: string
  selectedProfileBg: string
  selectedFrame: string
  selectedWallpaper: string
  isSetting?: boolean
}

export default function MyProfile({
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  selectedWallpaper,
  isSetting = true,
}: CustomPreviewProps) {
  return (
    <div className={style.customContainer}>
      <div className={style.customBackground}>
        <div className={style.customFnc}>
          {isSetting && (
            <Link href={'/mypage/1/profileSetting'} className={style.setting}>
              <img src="/assets/setting.svg" alt="navigation profile setting" />
            </Link>
          )}
        </div>

        <div className={style.profileResult}>
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
          <img
            className={style.wallPaper}
            src={selectedWallpaper}
            alt={selectedWallpaper}
          />
        </div>
      </div>
    </div>
  )
}
