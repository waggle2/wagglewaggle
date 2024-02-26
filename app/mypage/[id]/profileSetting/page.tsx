import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import CustomProfile from './_components/CustomProfile'

export default function ProfileSetting() {
  return (
    <div>
      <Header leftSection={<Back />} title={'프로필 설정'} />
      <CustomProfile />
    </div>
  )
}
