import Link from '@/node_modules/next/link'
import style from './styles/profileSetting.module.scss'

type CustomPreviewProps = {
  profileAnimal?: string
  profileItems?: []
  isSetting?: boolean
}

export default function MyProfile({
  profileAnimal,
  isSetting = true,
}: CustomPreviewProps) {
  const defaultBackground = {
    frame: '/assets/point_shop/frame/frame_default.svg',
    backGround: `/assets/point_shop/profile_background/background_white.svg`,
    wallPaper: '/assets/point_shop/wallpaper/wallpaper_default.svg',
  }
  console.log(profileAnimal, 'profileAnimal')
  const defaultProfile = `/assets/point_shop/emoji/${profileAnimal}_default.svg`
  //사용 x
  return (
    <div className={style.customContainer}>
      <div className={style.customBackground}>
        <div className={style.customFnc}>
          {isSetting && (
            <Link
              href={{
                pathname: '/mypage/profileSetting',
                query: { defaultAnimal: `${profileAnimal}` },
              }}
              className={style.setting}
            >
              <img src="/assets/setting.svg" alt="navigation profile setting" />
            </Link>
          )}
        </div>

        <div className={style.profileResult}>
          <img className={style.emoji} src={defaultProfile} alt={'emoji'} />
          <img
            className={style.frame}
            src={defaultBackground.frame}
            alt={'frame'}
          />
          <img
            className={style.profileBg}
            src={defaultBackground.backGround}
            alt={'background'}
          />
          <img
            className={style.wallPaper}
            src={defaultBackground.wallPaper}
            alt={'wallPaper'}
          />
        </div>
      </div>
    </div>
  )
}
