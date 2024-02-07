import style from './mypage.module.scss'

import Header from '../_components/common/header/page'
import Title from '../_components/common/header/_components/Title'
import MyProfile from './[id]/profileSetting/_components/MyProfile'
import MyType from './[id]/_components/MyType'
import SettingNav from './[id]/_components/SettingNav'
import Search from '../_components/common/header/_components/Search'
import Bell from '../_components/common/header/_components/Bell'
import Footer from '../_components/common/footer/page'

export default function MyPage() {
  const profile = {
    emoji: '',
    bg: '',
    frame: '',
    wallPaper: '',
    type: {
      cat: 87,
      bear: 87,
      dog: 87,
      fox: 87,
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
      <MyProfile
        selectedEmoji={`/point_shop/emoji/cat_smile.svg`}
        selectedProfileBg={'/point_shop/profile_background/프로필배경1.svg'}
        selectedFrame={'/point_shop/frame/프레임샘플.png'}
        selectedWallpaper={'/point_shop/wallpaper/벽지샘플.png'}
      />
      <div className={style.paddingContainer}>
        <MyType
          type={'고냥이'}
          cat={profile.type.cat}
          bear={profile.type.bear}
          dog={profile.type.dog}
          fox={profile.type.fox}
        />
        <SettingNav
          nickName={profile.nickname}
          href={'/mypage/1/nickNameModify'}
          title={'닉네임 변경'}
        />
        <SettingNav href={'/mypage/1/postHistory'} title={'내가 작성한 글'} />
        <SettingNav
          href={'/mypage/1/commentHistory'}
          title={'내가 댓글 단 글'}
        />
      </div>
      <div className={style.separationBar} />
      <div className={style.settingContainer}>
        <SettingNav
          href={'/mypage/1/editInformation'}
          title={'회원 정보 수정'}
        />
        <SettingNav href={'/'} title={'건의사항'} />
        <SettingNav href={'/'} title={'계정 설정'} />
      </div>

      <Footer />
    </>
  )
}
