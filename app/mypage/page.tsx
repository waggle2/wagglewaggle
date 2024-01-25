import Header from '../_components/common/header/page'
import Title from '../_components/common/header/_component/Title'
import CustomProfile from './_components/CustomProfile'

export default function MyPage() {
  return (
    <div>
      <Header leftSection={<Title title={'마이페이지'} />} />
      {/* <CustomProfile /> */}
    </div>
  )
}
