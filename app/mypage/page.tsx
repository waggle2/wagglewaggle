import Header from '../_components/common/header/page'
import Back from '../_components/common/header/_component/Back'

export default function MyPage() {
  return (
    <div>
      <Header leftSection={<Back />} title={'gi'} />
      myPage
    </div>
  )
}
