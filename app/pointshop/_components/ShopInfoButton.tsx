import Link from 'next/link'
import style from '../_styles/pointShop.module.scss'
export default function ShopInfoButton() {
    return (
        <div className={style.shopInfo}>
            <Link href='pointshop/i/flow/shopinfo' >
                <h4>샵 이용방법 안내</h4>
                <h3>어서와 포인트샵은 처음이지?</h3>
            </Link>
        </div >
    )
}

