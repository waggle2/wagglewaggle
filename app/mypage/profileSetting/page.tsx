import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import CustomProfile from './_components/CustomProfile'

export default function ProfileSetting({
  params,
}: {
  params: { defaultAnimal: string }
}) {
  return (
    <>
      <Header leftSection={<Back />} title={'프로필 꾸미기'} />
      <CustomProfile />
    </>
  )
}
