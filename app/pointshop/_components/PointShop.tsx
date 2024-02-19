'use client'
import style from '@/app/pointshop/_styles/pointShop.module.scss'
import ShopInfoButton from './ShopInfoButton'
import CustomProfile from './CustomProfile'
import Header from '@/app/_components/common/header/page'
import Footer from '@/app/_components/common/footer/page'
import Title from '@/app/_components/common/header/_components/Title'

export default function PointShop() {
  return (
    <>
      <Header leftSection={<Title title={'포인트샵'} />} />
      <div className={style.container}>
        <ShopInfoButton />

        {/* 꾸미기 영역 */}
        <CustomProfile />
      </div>
      <Footer />
    </>
  )
}
