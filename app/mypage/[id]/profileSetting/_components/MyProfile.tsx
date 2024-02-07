'use client'

import { useRouter } from '@/node_modules/next/navigation'
import style from './styles/profileSetting.module.scss'

type CustomPreviewProps = {
  selectedEmoji: string
  selectedProfileBg: string
  selectedFrame: string
  selectedWallpaper: string
}

export default function MyProfile({
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  selectedWallpaper,
}: CustomPreviewProps) {
  const router = useRouter()

  const navProfileSetting = () => {
    router.push('/mypage/profileSetting')
  }
  return (
    <div className={style.customContainer}>
      <div className={style.customBackground}>
        <div className={style.customFnc}>
          <button onClick={navProfileSetting} className={style.setting}>
            <img src="/assets/setting.svg" alt="navigation profile setting" />
          </button>
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
