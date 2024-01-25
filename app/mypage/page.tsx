import Header from '../_component/common/header/page'
import Back from '../_component/common/header/_component/Back'

export default function MyPage() {
  return (
    <div>
      <Header leftSection={<Back />} title={'gi'} />
      myPage
    </div>
  )
}
