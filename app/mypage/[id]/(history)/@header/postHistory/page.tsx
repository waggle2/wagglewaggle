import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'

export default function PostHistory() {
  return <Header leftSection={<Back />} title={'내가 작성한 글'} />
}
