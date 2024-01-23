import Footer from './_component/footer/page'
import Header from './_component/header/page'
import Image from '@/node_modules/next/image'
import logo from '../public/logo.svg'
import Search from './_component/header/_component/Search'
import Bell from './_component/header/_component/Bell'
export default function Home() {
  return (
    <main>
      <Header
        leftSection={<Image src={logo} alt={'로고'} width={124} height={24} />}
        rightSection={[<Search key={'search'} />, <Bell key={'bell'} />]}
      />
      <Footer />
    </main>
  )
}
