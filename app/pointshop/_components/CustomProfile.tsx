import React from 'react';
import style from '../_styles/pointShop.module.scss';
import CustomResult from '@/app/pointshop/_components/CustomResult';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedTabState, selectedItemTypeState } from '@/app/_recoil/atoms/pointshopState';
import { fetchItemState } from '@/app/_recoil/selectors/pointshopState';

type AnimalTab = '고냥이' | '곰돌이' | '댕댕이' | '폭스';

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
};

type FetchItemResult = {
    items: ItemData[];
    animalCoin: number;
};

export default function CustomProfile() {
    const [selectedTab, setSelectedTab] = useRecoilState<AnimalTab>(selectedTabState);
    const [selectedItemType, setSelectedItemType] = useRecoilState(selectedItemTypeState);

    // selector를 통해 아이템과 동물 코인 정보를 비동기적으로 가져옴
    const { items, animalCoin } = useRecoilValue<FetchItemResult>(fetchItemState);

    const handleTabClick = (animal: AnimalTab) => {
        setSelectedTab(animal);
    };

    const tabButtonStyle = (animal: string) => {
        return selectedTab === animal ? `${style.tabButton} ${style.active}` : style.tabButton;
    };

    return (
        <>
            {/* 동물 선택 탭 */}
            <div className={style.tabContainer}>
                <button className={tabButtonStyle('고냥이')} onClick={() => handleTabClick('고냥이')}>고냥이</button>
                <button className={tabButtonStyle('곰돌이')} onClick={() => handleTabClick('곰돌이')}>곰돌이</button>
                <button className={tabButtonStyle('댕댕이')} onClick={() => handleTabClick('댕댕이')}>댕댕이</button>
                <button className={tabButtonStyle('폭스')} onClick={() => handleTabClick('폭스')}>폭스</button>
            </div>
            {/* 아이템 및 동물 코인 정보를 CustomResult 컴포넌트에 전달 */}
            <CustomResult
                selectedTab={selectedTab}
                selectedItemType={selectedItemType}
                setSelectedItemType={setSelectedItemType}
                items={items}
                animalCoin={animalCoin}
            />
        </>
    );
}
