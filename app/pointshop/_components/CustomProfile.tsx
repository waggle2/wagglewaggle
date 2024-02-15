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
type AnimalTab = '고양이' | '곰' | '개' | '여우';

export default function CustomProfile() {
    const [selectedTab, setSelectedTab] = useState<AnimalTab>('고양이');
    const [items, setItems] = useState<ItemData[]>([]);
    const [selectedItemType, setSelectedItemType] = useState('emoji');
    const [animalCoin, setAnimalCoin] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = `/items/animals?animal=${encodeURIComponent(selectedTab)}&itemType=${encodeURIComponent(selectedItemType)}`;
            const usersEndpoint = `/users`;

            try {
                const [itemsResponse, usersResponse] = await Promise.all([
                    axiosInstance.get(endpoint),
                    axiosInstance.get(usersEndpoint),
                ]);

                const itemsData = itemsResponse.data.data.items;
                setItems(itemsData);

                // 선택된 탭에 따라 동적으로 동물 코인 데이터 추출
                const animalKeyMap: { [key in AnimalTab]: string } = {
                    '고양이': 'catCoins',
                    '곰': 'bearCoins',
                    '개': 'dogCoins',
                    '여우': 'foxCoins',
                };
                const animalCoinKey = animalKeyMap[selectedTab]; // 선택된 탭에 해당하는 키를 맵에서 찾음
                const animalCoinData = usersResponse.data.data[animalCoinKey]; // 동적으로 키를 사용하여 데이터 접근

                console.log(itemsResponse.data)
                setAnimalCoin(animalCoinData);
                console.log(usersResponse.data)
                console.log(selectedTab + "코인: " + animalCoin)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedTab, selectedItemType]);


    const handleTabClick = (animal: AnimalTab) => {
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
            {/* <div>{animalCoin}</div> */}
            <CustomResult
                selectedTab={selectedTab}
                selectedItemType={selectedItemType}
                setSelectedItemType={setSelectedItemType}
                items={items}
                animalCoin={animalCoin}
            />

        </>
    )
}

