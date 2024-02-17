import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'

export default function Suggest() {
  return <Header leftSection={<Back />} title="건의사항" />
}
