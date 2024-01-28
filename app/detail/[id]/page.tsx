import Back from '@/app/_components/common/header/_component/Back'
import Heart from '@/app/_components/common/header/_component/Heart'
import MoreMenu from '@/app/_components/common/header/_component/MoreMenu'
import Header from '@/app/_components/common/header/page'
import styles from './styles/page.module.scss'
import Content from './_components/Content'
import Comment from './_components/Comment'
import Sort from '/public/assets/sort.svg'

export default function Detail() {
  return (
    <div className={styles.container}>
      <Header leftSection={<Back />} rightSection={[<Heart />, <MoreMenu />]} />
      <Content
        title="14살 연하랑 썸타본 사람? 나 좀 공감해줘 여기 최대 두 줄"
        nickName="익명의 냥이"
        content="아 길거리에서 번호 땄는데 14살 연하야 ㅋ
        서로 연락 자주 해서 썸타고 있는거 같긴 한데,, 이게 맞는걸까?"
      />
      <div className={styles.commentInfo}>
        <div>
          <span>댓글</span>
          <span>2</span>
        </div>
        <div>
          <Sort width="14" height="14" />
          <span>최신순</span>
        </div>
      </div>
      <Comment nickName="익명의 냥이" />
      <div className={styles.line} />
      <Comment nickName="익명의 냥이" />
      <div className={styles.line} />
      <Comment nickName="익명의 냥이" />
    </div>
  )
}
