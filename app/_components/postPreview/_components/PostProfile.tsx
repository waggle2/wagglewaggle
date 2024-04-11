import { avatarItem } from '@/app/mypage/profileSetting/_components/types/responseType'
import style from './postProfile.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)

type CustomPreviewProps = {
  animal: string | undefined | null
  selectedEmoji?: avatarItem | undefined | null
  selectedProfileBg?: avatarItem | undefined | null
  selectedFrame?: avatarItem | undefined | null
  isWithDraw?: boolean
}

export default function PostProfile({
  animal,
  selectedEmoji,
  selectedProfileBg,
  selectedFrame,
  isWithDraw,
}: CustomPreviewProps) {
  return (
    <div className={style.imageContainer}>
      <div className={style.imageBox}>
        <div className={style.profileWrapper}>
          <img
            className={cx('emoji', isWithDraw ? '' : 'withDraw')}
            src={
              isWithDraw
                ? selectedEmoji
                  ? selectedEmoji.image
                  : `/assets/point_shop/emoji/${animal}_default.svg`
                : '/assets/withDrawProfile.svg'
            }
            alt={'selectedEmoji'}
          />
          <img
            className={style.profileBg}
            src={
              isWithDraw
                ? selectedProfileBg
                  ? selectedProfileBg.image
                  : `/assets/point_shop/profile_background/${animal}_background_default.svg`
                : '/assets/withDrawBg.svg'
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
  )
}
