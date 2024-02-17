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
import { useEffect } from 'react'

export default function MyPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users')
        console.log(res.data, 'mypage')
      } catch (e) {
        console.error(e, 'mypageError')
      }
    }
    fetchData()
  }, [])
  let profile = {
    emoji: '',
    bg: '',
    frame: '',
    wallPaper: '',
    type: {
      cat: 0,
      bear: 0,
      dog: 0,
      fox: 0,
    },
    nickname: '열정열정제이지',
    posts: {
      profile: {
        image: '',
        name: '익명의 누군가',
        category: '수다수다',
        tag: '19',
      },
      post: {
        time: '1분전',
        title: '14살 연하랑 썸타본 사람? 나 좀 공감해줘',
        content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ 
        서로 연락 자주 해서 썸타고 있는거 같긴 한데,,이게 맞는걸까?`,
        likes: 24,
        comments: 24,
        views: 24,
      },
    },
  }

  return (
    <>
      <Header
        leftSection={<Title title={'MY'} />}
        rightSection={[<Search />, <Bell />]}
      />
      <div className={style.paddingContainer}>
        <MyProfile
          selectedEmoji={`/assets/point_shop/emoji/cat_smile.svg`}
          selectedProfileBg={
            '/assets/point_shop/profile_background/프로필배경1.svg'
          }
          selectedFrame={'/assets/point_shop/frame/프레임샘플.png'}
          selectedWallpaper={'/assets/point_shop/wallpaper/벽지샘플.png'}
        />
        <MyType
          type={'고냥이'}
          cat={profile.type.cat}
          bear={profile.type.bear}
          dog={profile.type.dog}
          fox={profile.type.fox}
        />
        <SettingNav
          nickName={profile.nickname}
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
