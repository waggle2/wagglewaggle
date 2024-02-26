'use client'
import style from '@/app/pointshop/_styles/pointShop.module.scss'
import ShopInfoButton from './ShopInfoButton'
import CustomProfile from './CustomProfile'
import Header from '@/app/_components/common/header/Header'
<<<<<<< HEAD
import Search from '@/app/_components/common/header/_components/Search'
import Bell from '@/app/_components/common/header/_components/Bell'
=======
>>>>>>> 6d3975185bb40e2af42e71ba2195050834d962c4
import Footer from '@/app/_components/common/footer/Footer'
import Title from '@/app/_components/common/header/_components/Title'

export default function PointShop() {
  return (
    <>
      <Header
        leftSection={<Title title={'포인트샵'} />}
        rightSection={[<Search />, <Bell />]}
      />
      <div className={style.container}>
        {/* <ShopInfoButton /> */}

        {/* 꾸미기 영역 */}
        <CustomProfile />
      </div>
      <Footer />
    </>
  )
}
