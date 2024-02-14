'use client'
import axios from 'axios';
import style from '../_styles/pointShop.module.scss'
import { useEffect, useState } from 'react'
import CustomResult from '@/app/pointshop/_components/CustomContainer'

type ItemData = {
    id: number;
    animal: string;
    itemType: string;
    name: string;
    price: number;
    image: string;
    purchasedCount: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    isOwned: boolean;
}

export default function CustomProfile() {
    const [selectedTab, setSelectedTab] = useState('고양이');
    const [items, setItems] = useState<ItemData[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}v1/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=wallpaper`,);
                const items = await res.data.data.items
                setItems(items);

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();

    }, [selectedTab]);


    const handleTabClick = (animal: string) => {
        setSelectedTab(animal);
    }

    const tabButtonStyle = (animal: string) => {
        return selectedTab === animal ? `${style.tabButton} ${style.active}` : style.tabButton;
    }

    return (



        <>
            {/* 동물 선택 탭 */}
            <div className={style.tabContainer}>
                <button className={tabButtonStyle('고양이')} onClick={() => handleTabClick('고양이')}>고냥이</button>
                <button className={tabButtonStyle('곰')} onClick={() => handleTabClick('곰')}>곰돌이</button>
                <button className={tabButtonStyle('강아지')} onClick={() => handleTabClick('강아지')}>댕댕이</button>
                <button className={tabButtonStyle('여우')} onClick={() => handleTabClick('여우')}>폭스</button>
            </div>

            {/* 동물 꾸미기 */}
            <CustomResult selectedTab={selectedTab} />

        </>
    )
}

