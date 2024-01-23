import Header from '../_component/header/page'
import Back from '../_component/header/_component/Back'

export default function MyPage() {
  return (
    <div>
      <Header leftSection={<Back />} title={'gi'} />
      myPage
    </div>
  )
}
