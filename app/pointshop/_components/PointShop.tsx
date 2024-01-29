import style from '@/app/pointshop/_styles/pointShop.module.scss'
import ShopInfoButton from './ShopInfoButton'
import CustomProfile from './CustomProfile'

export default function PointShop() {
  return (
    <>
      <div className={style.header}>
        <h2>포인트샵</h2>
        {/* 포인트샵 이용안내 */}
        <ShopInfoButton />
      </div>

      {/* 꾸미기 영역 */}
      <CustomProfile />
    </>
  )
}
