import style from '../_styles/pointShop.module.scss'
import { useEffect, useState } from "react"
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';

type Props = {
    selectedTab: string,
}

type Item = {
    id: number,
    src: string,
    price: number,
    category: 'emoji' | 'profileBg' | 'frame' | 'wallpaper',
};

type CategoryPriority = {
    [key in Item['category']]: number
};

const categoryPriority: CategoryPriority = {
    'emoji': 1,
    'profileBg': 2,
    'frame': 3,
    'wallpaper': 4
};

export default function CustomResult({ selectedTab }: Props) {

    // 확인 모달의 보임 상태
    const [confirmModal, setConfirmModal] = useState(false);

    // 현재 선택된 아이템 카테고리 탭 상태
    const [itemCategoryTab, setItemCategoryTab] = useState('이모지');

    // 장바구니 아이템 금액
    const [totalItemPrice, setTotalItemPrice] = useState(0);

    // 보유 포인트
    const [possessionCoin, setPossessionCoin] = useState(90);

    // 구매시 포인트 잔액
    const pointDifference = possessionCoin - totalItemPrice;

    // 프로필 미리보기부분 기본 상태는 유저 프로필데이터의 이미지경로가 될듯??
    const [selectedEmoji, setSelectedEmoji] = useState('/point_shop/emoji/cat_smile.svg')
    const [selectedProfileBg, setSelectedProfileBg] = useState('/point_shop/profile_background/프로필배경1.svg')
    const [selectedFrame, setSelectedFrame] = useState('/point_shop/frame/프레임샘플.png')
    const [selectedWallpaper, setSelectedWallpaper] = useState('/point_shop/wallpaper/벽지샘플.png')

    //선태한 아이템
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);



    //Test 상품들
    const products = [
        {
            id: 0,
            src: `/point_shop/emoji/${selectedTab}_smile.svg`,
            price: 10,
            category: 'emoji'
        },
        {
            id: 1,
            src: `/point_shop/emoji/${selectedTab}_empathy.svg`,
            price: 20,
            category: 'emoji'
        },
        {
            id: 2,
            src: `/point_shop/emoji/${selectedTab}_angry.svg`,
            price: 40,
            category: 'emoji'
        },
        {
            id: 3,
            src: `/point_shop/emoji/${selectedTab}_panic.svg`,
            price: 50,
            category: 'emoji'
        },
        {
            id: 4,
            src: `/point_shop/emoji/${selectedTab}_disagree.svg`,
            price: 60,
            category: 'emoji'
        },
        {
            id: 5,
            src: `/point_shop/emoji/${selectedTab}_sad.svg`,
            price: 70,
            category: 'emoji'
        },
        {
            id: 6,
            src: `/point_shop/emoji/${selectedTab}_insidious.svg`,
            price: 10,
            category: 'emoji'
        },
        {
            id: 7,
            src: `/point_shop/emoji/${selectedTab}_serious.svg`,
            price: 80,
            category: 'emoji'
        },
        {
            id: 9,
            src: '/point_shop/profile_background/프로필배경1.svg',
            price: 15,
            category: 'profileBg'
        },
        {
            id: 10,
            src: '/point_shop/profile_background/프로필배경2.svg',
            price: 25,
            category: 'profileBg'
        },
        {
            id: 11,
            src: '/point_shop/profile_background/프로필배경3.svg',
            price: 15,
            category: 'profileBg'
        },
        {
            id: 12,
            src: '/point_shop/profile_background/프로필배경4.svg',
            price: 25,
            category: 'profileBg'
        },
        {
            id: 13,
            src: '/point_shop/frame/프레임샘플.png',
            price: 30,
            category: 'frame'
        },
        {
            id: 14,
            src: '/point_shop/frame/프레임샘플2.png',
            price: 40,
            category: 'frame'
        },
        {
            id: 15,
            src: '/point_shop/frame/프레임샘플3.png',
            price: 30,
            category: 'frame'
        },
        {
            id: 16,
            src: '/point_shop/frame/프레임샘플4.png',
            price: 40,
            category: 'frame'
        },

        {
            id: 17,
            src: '/point_shop/wallpaper/벽지샘플.png',
            price: 35,
            category: 'wallpaper'
        },
        {
            id: 18,
            src: '/point_shop/wallpaper/벽지샘플2.png',
            price: 45,
            category: 'wallpaper'
        },
        {
            id: 19,
            src: '/point_shop/wallpaper/벽지샘플3.png',
            price: 35,
            category: 'wallpaper'
        },
        {
            id: 20,
            src: '/point_shop/wallpaper/벽지샘플4.png',
            price: 45,
            category: 'wallpaper'
        },
    ];

    // 구매확인 모달 상태 토글
    const handleConfirmModalClick = () => {
        setConfirmModal(!confirmModal);
    }

    //아이템 카테고리 선택 업데이트
    const handleCategoryClick = (category: string) => {
        setItemCategoryTab(category);
    }

    // 선택된 아이템 카테고리에 따라 탭 버튼의 스타일 지정
    const tabCategoryButtonStyle = (category: string) => {
        return itemCategoryTab === category ? `${style.tabButton} ${style.active}` : style.tabButton;

    }

    useEffect(() => {
        // 모달이 열려 있을 때 스크롤 방지
        if (confirmModal === true) {
            document.body.style.overflow = 'hidden'
        }

        // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [confirmModal])


    // 아이템 선택 로직
    const handleItemClick = (item: Item) => {
        const existingItemIndex = selectedItems.findIndex(selectedItem => selectedItem.category === item.category);

        let newSelectedItems = existingItemIndex >= 0
            ? selectedItems.map((selectedItem, index) => index === existingItemIndex ? item : selectedItem)
            : [...selectedItems, item];

        newSelectedItems.sort((a, b) => categoryPriority[a.category] - categoryPriority[b.category]);

        // 카테고리별로 해당 이미지 경로 업데이트
        switch (item.category) {
            case 'emoji':
                setSelectedEmoji(item.src);
                break;
            case 'profileBg':
                setSelectedProfileBg(item.src);
                break;
            case 'frame':
                setSelectedFrame(item.src);
                break;
            case 'wallpaper':
                setSelectedWallpaper(item.src);
                break;
            default:
                // 기본 경우 처리
                break;
        }

        setSelectedItems(newSelectedItems);
    };

    const handleRefreshClick = () => {
        // 장바구니 비우기
        setSelectedItems([]);

        // 각 상태를 초기 상태로 설정
        setSelectedEmoji('/point_shop/emoji/cat_smile.svg');
        setSelectedProfileBg('/point_shop/profile_background/프로필배경1.svg');
        setSelectedFrame('/point_shop/frame/프레임샘플.png');
        setSelectedWallpaper('/point_shop/wallpaper/벽지샘플.png');
    };


    // 총 금액 계산
    useEffect(() => {
        const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
        setTotalItemPrice(totalPrice);
    }, [selectedItems])


    return (
        <>
            {confirmModal && <ConfirmChange
                pointDifference={pointDifference}
                selectedItemsLength={selectedItems.length}
                onConfirmClick={handleConfirmModalClick} />}

            {/* 선택된 동물 꾸미기 미리보기 */}
            <CustomPreview
                selectedTab={selectedTab}
                selectedEmoji={selectedEmoji}
                selectedProfileBg={selectedProfileBg}
                selectedFrame={selectedFrame}
                selectedWallpaper={selectedWallpaper}
                possessionCoin={possessionCoin}
                handleConfirmModalClick={handleConfirmModalClick}
                handleRefreshClick={handleRefreshClick} />

            {/* 장바구니 */}
            <Cart
                selectedItems={selectedItems}
                totalItemPrice={totalItemPrice}
            />

            {/* 아이템 선택 */}
            <ItemSelection
                itemCategoryTab={itemCategoryTab}
                handleCategoryClick={handleCategoryClick}
                tabCategoryButtonStyle={tabCategoryButtonStyle}
                products={products}
                handleItemClick={handleItemClick}
                selectedItems={selectedItems}
            />




        </>
    )
}

