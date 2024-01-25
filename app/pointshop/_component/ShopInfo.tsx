'use client'

import style from './shopInfo.module.css'
import { useRouter } from 'next/navigation'

export default function ShopInfo() {
    const router = useRouter();

    const onClickClose = () => {
        router.back();
    }

    return (
        <div className={style.modalBackground}>
            <div>포인트샵 이용안내입니다.</div>
            <button onClick={onClickClose}>BACK</button>
        </div>
    )
}
