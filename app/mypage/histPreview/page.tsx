import style from './histPreview.module.scss'

import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import Post from '@/app/_components/postPreview/_components/Post'
import TestProfile from '@/public/assets/profile.svg'

export default function HistPreview() {
  return (
    <>
      <Header leftSection={<Back />} title={'내가 쓴 글'} />
      <div className={style.container}>
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
              서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
            서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
          서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
        서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
        <Post
          profile={{
            image: <TestProfile />,
            name: '익명의 누군가',
            category: '수다수다',
            tag: '19',
          }}
          post={{
            title: '14살 연하랑 썸타본사람? 나 좀 공감해줘',
            content: `아 길거리에서 번호 땄는데 14살 연하야 ㅋ
      서로 연락 자주해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?`,
            likes: 24,
            comments: 24,
            views: 24,
            time: '1분전',
          }}
        />
      </div>
    </>
  )
}
