'use client'

import { userResponseData } from './_types/userData'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import style from './mypage.module.scss'

import api from '../_api/commonApi'

import Header from '../_components/common/header/Header'
import Title from '../_components/common/header/_components/Title'
import MyProfile from './_components/MyProfile'
import MyType from './_components/MyType'
import SettingNav from './_components/SettingNav'
import Search from '../_components/common/header/_components/Search'
import Bell from '../_components/common/header/_components/Bell'
import Footer from '../_components/common/footer/Footer'

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<userResponseData>()
  const router = useRouter()
  //useGetLogin 사용하기에는 리엑트 쿼리에 stale이 걸려있지 않아 컴포넌트라 렌더링 될 때마다 계속 서버로 요청을 보내는 이슈가 있음
  //staleTime을 걸면 해당 시간동안 변경된 데이터가 적용되지 않는 이슈(닉네임 변경 등)가 있어 사용x
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/users')
        console.log(data, 'mypage')
        setUserInfo(data)
      } catch (e: any) {
        if (e.code === 404) router.replace('/')
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
        <SettingNav href={'/mypage/commentHistory'} title={'내가 댓글 단 글'} />
      </div>
      <div className={style.separationBar} />
      <div className={style.settingContainer}>
        <SettingNav href={'/mypage/feedback'} title={'건의사항'} />
        <SettingNav href={'/mypage/accountSetting'} title={'계정 설정'} />
        <SettingNav href={'/mypage/logout'} title={'로그아웃'} />
      </div>

      <Footer />
    </>
  )
}
