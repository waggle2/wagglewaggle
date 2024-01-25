'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from '@/app/pointshop/_component/point.module.scss'
import CustomResult from '@/app/pointshop/_component/CustomResult'

export default function PointShop() {

    const [selectedTab, setSelectedTab] = useState('cat');

    const handleTabClick = (animal: string) => {
        setSelectedTab(animal);
    }

    const tabButtonStyle = (animal: string) => {
        return selectedTab === animal ? `${style.tabButton} ${style.active}` : style.tabButton;
    }

    return <div>
        {/* 헤더 */}
        <div className={style.header}>
            <h2 >포인트샵</h2>

            {/* 이용안내 모달*/}
            <div className={style.shopInfo}>
                <Link href='pointshop/i/flow/shopinfo' >
                    <h4>샵 이용방법 안내</h4>
                    <h3>어서와 포인트샵은 처음이지?</h3>
                </Link>
            </div>

            {/* 동물 선택 탭 */}
            <div className={style.tabContainer}>
                <button className={tabButtonStyle('cat')} onClick={() => handleTabClick('cat')}>고냥이</button>
                <button className={tabButtonStyle('bear')} onClick={() => handleTabClick('bear')}>곰돌이</button>
                <button className={tabButtonStyle('dog')} onClick={() => handleTabClick('dog')}>댕댕이</button>
                <button className={tabButtonStyle('fox')} onClick={() => handleTabClick('fox')}>폭스</button>
            </div>
        </div>

        {/* 동물 꾸미기 결과 컴포넌트 */}
        <CustomResult selectedTab={selectedTab} />
    </div>
}

