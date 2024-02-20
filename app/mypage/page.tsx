'use client'

import style from './mypage.module.scss'

import Header from '../_components/common/header/Header'
import Title from '../_components/common/header/_components/Title'
import MyProfile from './profileSetting/_components/MyProfile'
import MyType from './_components/MyType'
import SettingNav from './_components/SettingNav'
import Search from '../_components/common/header/_components/Search'
import Bell from '../_components/common/header/_components/Bell'
import Footer from '../_components/common/footer/Footer'
import Link from '@/node_modules/next/link'

import api from '../_api/commonApi'
import { userResponseData } from './_types/userData'
import { useEffect, useState } from 'react'

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<userResponseData>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users')
        const userData = res.data
        console.log(res.data, 'mypage')
        setUserInfo(userData)
        // return res.data
      } catch (e) {
        console.error(e, 'mypageError')
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Header
        leftSection={<Title title={'MY'} />}
        rightSection={[<Search />, <Bell />]}
      />
      <div className={style.paddingContainer}>
        <MyProfile
          profileAnimal={userInfo?.profileAnimal}
          profileItems={userInfo?.profileItems}
        />
        <MyType
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
        <SettingNav href={'/mypage/commentHistory'} title={'내가 댓글 단 글'} />
      </div>
      <div className={style.separationBar} />
      <div className={style.settingContainer}>
        <SettingNav href={'/mypage/editInformation'} title={'회원 정보 수정'} />
        <SettingNav href={'/'} title={'건의사항'} />
        <SettingNav href={'/mypage/accountSetting'} title={'계정 설정'} />
      </div>

      <Footer />
    </>
  )
}
