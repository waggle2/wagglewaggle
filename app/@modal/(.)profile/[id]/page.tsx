'use client'

import { useRouter } from 'next/navigation'

import Close from '@/app/_components/common/header/_components/Close'
import Modal from '@/app/_components/common/modal/Modal'
import style from './profile.module.scss'
import Button from '@/app/_components/button/Button'
import MyType from '@/app/mypage/_components/MyType'

import Link from '@/node_modules/next/link'
import api from '@/app/_api/commonApi'
import { useEffect, useState } from 'react'
import { profileData } from './profileDataTypes'
import CustomPreview from '@/app/mypage/profileSetting/_components/CustomPreview'
import { wearingItem } from '@app/mypage/profileSetting/_components/types/responseType'

export default function Profile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<profileData>()
  const [wearingItem, setWearingItem] = useState<wearingItem>({
    emoji: null,
    background: null,
    frame: null,
    wallpaper: null,
  })

  //TODO: 탈퇴한 유저 & 유저 프로필,메세지 이동 처리
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/users/profile/${params.id}`)
        console.log(data, 'data')
        setUserInfo(data)
        const filteringWearingItem = await data.profileItems?.filter(
          (profileItems: any) => {
            return data.profileAnimal === profileItems.animal
          },
        )
        console.log(filteringWearingItem, 'filteringWearingItem')
        setWearingItem(filteringWearingItem)
      } catch (err: any) {
        alert('탈퇴한 유저입니다.')
        router.back()
      }
    }
    fetchData()
  }, [])

  const handleClose = () => {
    router.back()
  }

  return (
    <Modal
      title={
        <div className={style.container}>
          <span>{userInfo?.nickname}</span>
          <Close clickEvent={handleClose} />
        </div>
      }
      content={
        <div className={style.contentWrapper}>
          <CustomPreview
            animal={userInfo?.profileAnimal}
            isSetting={false}
            selectedEmoji={wearingItem[0]?.emoji}
            selectedProfileBg={wearingItem[0]?.background}
            selectedFrame={wearingItem[0]?.frame}
            selectedWallpaper={wearingItem[0]?.wallpaper}
          />
          <MyType
            primaryAnimal={userInfo?.primaryAnimal}
            cat={userInfo?.userStickers.catStickers}
            bear={userInfo?.userStickers.bearStickers}
            dog={userInfo?.userStickers.dogStickers}
            fox={userInfo?.userStickers.foxStickers}
          />
        </div>
      }
      buttons={[
        <Link href={'/send-msg/1'} style={{ width: '100%' }} key="sendMessage">
          <Button text={'쪽지 보내기'} mainColor={'green'} key="msg" />
        </Link>,
      ]}
    />
  )
}
