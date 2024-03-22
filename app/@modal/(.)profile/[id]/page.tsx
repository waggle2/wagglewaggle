'use client'

import { useRouter } from 'next/navigation'

import Close from '@/app/_components/common/header/_components/Close'
import Modal from '@/app/_components/common/modal/Modal'
import style from './profile.module.scss'
import Button from '@/app/_components/button/Button'
import MyType from '@/app/mypage/_components/MyType'
import MyProfile from '@/app/mypage/_components/MyProfile'
import Link from '@/node_modules/next/link'
import api from '@/app/_api/commonApi'
import { useEffect, useState } from 'react'
import { profileData } from './profileDataTypes'

export default function Profile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<profileData>()
  //TODO: 탈퇴한 유저 & 유저 프로필,메세지 이동 처리
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/users/profile/${params.id}`)
        console.log(data, 'data')
        setUserInfo(data)
      } catch (err) {
        console.log(err, 'err')
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
          <MyProfile isSetting={false} />
          <MyType
            primaryAnimal={
              userInfo?.primaryAnimal
                ? userInfo.primaryAnimal
                : userInfo?.secondAnimal
            }
            cat={userInfo?.userStickers.catStickers}
            bear={userInfo?.userStickers.bearStickers}
            dog={userInfo?.userStickers.dogStickers}
            fox={userInfo?.userStickers.foxStickers}
          />
        </div>
      }
      buttons={[
        <Button
          text={'닫기'}
          mainColor={'grey'}
          key="close"
          action={handleClose}
        />,
        <Link href={'/send-msg/1'} style={{ width: '100%' }} key="sendMessage">
          <Button text={'쪽지 보내기'} mainColor={'green'} key="msg" />
        </Link>,
      ]}
    />
  )
}
