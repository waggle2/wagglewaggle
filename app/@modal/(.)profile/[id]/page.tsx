'use client'

import { useRouter } from 'next/navigation'

import Close from '@/app/_components/common/header/_components/Close'
import Modal from '@/app/_components/common/modal/Modal'
import style from './profile.module.scss'
import Button from '@/app/_components/button/Button'
import MyType from '@/app/mypage/[id]/_components/MyType'
import MyProfile from '@/app/mypage/[id]/profileSetting/_components/MyProfile'
import Link from '@/node_modules/next/link'

export default function Profile() {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <Modal
      title={
        <div className={style.container}>
          <span>내이름은 김삼순</span>
          <Close clickEvent={handleClose} />
        </div>
      }
      content={
        <div className={style.contentWrapper}>
          <MyProfile
            selectedEmoji={`/assets/point_shop/emoji/cat_smile.svg`}
            selectedProfileBg={
              '/assets/point_shop/profile_background/프로필배경1.svg'
            }
            selectedFrame={'/assets/point_shop/frame/프레임샘플.png'}
            selectedWallpaper={'/assets/point_shop/wallpaper/벽지샘플.png'}
            isSetting={false}
          />
          <MyType type={'고냥이'} cat={92} bear={32} dog={32} fox={32} />
        </div>
      }
      buttons={[
        <Button
          text={'닫기'}
          mainColor={'grey'}
          key="close"
          action={handleClose}
        />,
        <Link
          href={'http://localhost:3000/send-msg/1'}
          style={{ width: '100%' }}
        >
          <Button text={'쪽지 보내기'} mainColor={'green'} key="msg" />
        </Link>,
      ]}
    />
  )
}
