import Header from '../_components/common/header/page'
import Back from '../_components/common/header/_component/Back'
import Title from '../_components/common/header/_component/Title'

export default function MyPage() {
  return (
    <div>
      <Header leftSection={<Title title={'마이페이지'} />} />
      myPage
    </div>
  )
}
