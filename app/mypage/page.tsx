'use client'

import { userResponseData } from './_types/userData'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import style from './mypage.module.scss'

import api from '../_api/commonApi'

import Header from '../_components/common/header/Header'
import Title from '../_components/common/header/_components/Title'
// import MyProfile from './_components/MyProfile'
import MyType from './_components/MyType'
import SettingNav from './_components/SettingNav'
import Search from '../_components/common/header/_components/Search'
import Bell from '../_components/common/header/_components/Bell'
import Footer from '../_components/common/footer/Footer'
import CustomPreview from './profileSetting/_components/CustomPreview'
import { wearingItem } from './profileSetting/_components/types/responseType'

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<userResponseData>()
  const [wearingItem, setWearingItem] = useState<wearingItem>({
    emoji: null,
    background: null,
    frame: null,
    wallpaper: null,
  })

  const router = useRouter()
  //TODO: useGetLogin useEffect로 수정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/users')
        console.log(data, 'mypage')
        const wearing = data.profileItems.filter((profileItems: any) => {
          return data.profileAnimal === profileItems.animal
        })
        setUserInfo(() => data)
        setWearingItem(wearing[0])
      } catch (e: any) {
        if (e.code === 404) router.replace('/')
        console.error(e, 'mypageError')
      }
    }
    fetchData()
  }, [])
  console.log(wearingItem, 'wearingItem')
  return (
    <>
      <Header
        leftSection={<Title title={'MY'} />}
        rightSection={[<Search />, <Bell />]}
      />
      <div className={style.container}>
        <div className={style.paddingContainer}>
          <CustomPreview
            animal={userInfo?.profileAnimal}
            isSetting={true}
            selectedEmoji={wearingItem.emoji}
            selectedProfileBg={wearingItem.background}
            selectedFrame={wearingItem.frame}
            selectedWallpaper={wearingItem.wallpaper}
          />
          <MyType
            nickName={userInfo?.credential.nickname}
            primaryAnimal={userInfo?.primaryAnimal}
            cat={userInfo?.catCoins}
            bear={userInfo?.bearCoins}
            dog={userInfo?.dogCoins}
            fox={userInfo?.foxCoins}
          />
          <SettingNav
            nickName={userInfo?.credential.nickname}
            href={'/mypage/nickNameModify'}
            title={'닉네임 변경'}
          />
          <SettingNav href={'/mypage/postHistory'} title={'내가 작성한 글'} />
          <SettingNav
            href={'/mypage/commentHistory'}
            title={'내가 댓글 단 글'}
          />
        </div>
        <div className={style.separationBar} />
        <div className={style.settingContainer}>
          <SettingNav href={'/mypage/feedback'} title={'건의사항'} />
          <SettingNav href={'/mypage/accountSetting'} title={'계정 설정'} />
          <SettingNav href={'/mypage/logout'} title={'로그아웃'} />
        </div>
      </div>
      <Footer />
    </>
  )
}
