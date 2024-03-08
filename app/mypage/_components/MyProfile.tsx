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
    frame: '/assets/point_shop/frame/프레임샘플.png',
    backGround: '/assets/프로필배경_테스트.svg',
    wallPaper: '/assets/point_shop/wallpaper/벽지샘플.png',
  }
  let type
  switch (profileAnimal) {
    case '고냥이':
      type = 'Cat'
      break
    case '댕댕이':
      type = 'Dog'
      break
    case '폭스':
      type = 'Fox'
      break
    case '곰돌이':
      type = 'Bear'
      break

    default:
      type = ''
      break
  }
  const defaultProfile = `/assets/default${type}Emoji.svg`
  const test = `/assets/point_shop/emoji/cat_smile.svg`
  return (
    <div className={style.customContainer}>
      <div className={style.customBackground}>
        <div className={style.customFnc}>
          {isSetting && (
            <Link href={'/mypage/profileSetting'} className={style.setting}>
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
