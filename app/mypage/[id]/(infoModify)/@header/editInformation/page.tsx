import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'

export default function EditInformation() {
  return <Header leftSection={<Back />} title={'회원 정보 수정'} />
}
