'use client'
import axiosInstance from '@/app/_api/config'

import api from '@/app/_api/commonApi';
import axios from 'axios';
import style from '../_styles/pointShop.module.scss'
import { useEffect, useState } from 'react'
import CustomResult from '@/app/pointshop/_components/CustomResult'

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
    const [selectedItemType, setSelectedItemType] = useState('emoji');


    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`;
            const requestUrl = `${axiosInstance.defaults.baseURL}${endpoint}`; // 요청 URL 조합
            console.log('Requesting URL:', requestUrl); // 요청 URL 출력

            try {
                const { data } = await axiosInstance.get(endpoint);
                setItems(data.data.items);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchData();
        // console.log(items)

    }, [selectedTab, selectedItemType]);


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
                <button className={tabButtonStyle('개')} onClick={() => handleTabClick('개')}>댕댕이</button>
                <button className={tabButtonStyle('여우')} onClick={() => handleTabClick('여우')}>폭스</button>
            </div>

            {/* 동물 꾸미기 */}
            <CustomResult selectedTab={selectedTab} selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} items={items} />

        </>
    )
}

