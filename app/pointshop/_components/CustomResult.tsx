'use client'
import style from '../_styles/pointShop.module.scss'
import { useEffect, useState } from "react"
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';



type Props = {
  selectedTab: string,
  items: ItemData[],
  selectedItemType: string,
  setSelectedItemType: (value: string) => void;
}

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


export default function CustomResult({ selectedTab, items, selectedItemType, setSelectedItemType }: Props) {


  // 확인 모달의 보임 상태
  const [confirmModal, setConfirmModal] = useState(false);

  // 현재 선택된 아이템 카테고리 탭 상태
  // const [selectedItemType, setSelectedItemType] = useState('emoji');

  // 장바구니 아이템 금액
  const [totalItemPrice, setTotalItemPrice] = useState(0);

  // 보유 포인트
  const [possessionCoin, setPossessionCoin] = useState(90);

  // 구매시 포인트 잔액
  const pointDifference = possessionCoin - totalItemPrice;

  // 프로필 미리보기부분 기본 상태는 유저 프로필데이터의 이미지경로가 될듯??
  const [selectedEmoji, setSelectedEmoji] = useState('/assets/point_shop/emoji/cat_smile.svg')
  const [selectedProfileBg, setSelectedProfileBg] = useState('/assets/point_shop/profile_background/프로필배경1.svg')
  const [selectedFrame, setSelectedFrame] = useState('/assets/point_shop/frame/프레임샘플.png')
  const [selectedWallpaper, setSelectedWallpaper] = useState('/assets/point_shop/wallpaper/벽지샘플.png')

  //선태한 아이템
  const [selectedItems, setSelectedItems] = useState<ItemData[]>([]);


  // 구매확인 모달 상태 토글
  const handleConfirmModalClick = () => {
    setConfirmModal(!confirmModal);
  }

  //아이템 카테고리 선택 업데이트
  const handleCategoryClick = (itemType: string) => {
    setSelectedItemType(itemType);
  }

  // 선택된 아이템 카테고리에 따라 탭 버튼의 스타일 지정
  const tabCategoryButtonStyle = (itemType: string) => {
    return itemType === selectedItemType ? `${style.tabButton} ${style.active}` : style.tabButton;

  }


  useEffect(() => {
    // .container 클래스를 가진 모든 요소 선택
    const containers = document.getElementsByClassName(style.container);

    // Element 타입을 HTMLElement로 형 변환
    const containerElements = Array.from(containers) as HTMLElement[];

    if (confirmModal) {
      // 스크롤 방지 적용
      containerElements.forEach((container) => {
        container.style.overflow = 'hidden';
      });
    } else {
      // 스크롤 허용
      containerElements.forEach((container) => {
        container.style.overflow = 'unset';
      });
    }

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 활성화
    return () => {
      containerElements.forEach((container) => {
        container.style.overflow = 'unset';
      });
    };
  }, [confirmModal]);


  // 아이템 선택 로직
  const handleItemClick = (items: ItemData) => {
    const existingItemIndex = selectedItems.findIndex(selectedItem => selectedItem.itemType === items.itemType);

    let newSelectedItems = existingItemIndex >= 0
      ? selectedItems.map((selectedItem, index) => index === existingItemIndex ? items : selectedItem)
      : [...selectedItems, items];

    // newSelectedItems.sort((a, b) => categoryPriority[a.category] - categoryPriority[b.category]);

    // 카테고리별로 해당 이미지 경로 업데이트
    switch (items.itemType) {
      case 'emoji':
        setSelectedEmoji(items.image);
        break;
      case 'background':
        setSelectedProfileBg(items.image);
        break;
      case 'frame':
        setSelectedFrame(items.image);
        break;
      case 'wallpaper':
        setSelectedWallpaper(items.image);
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
    setSelectedEmoji('/assets/point_shop/emoji/cat_smile.svg');
    setSelectedProfileBg('/assets/point_shop/profile_background/프로필배경1.svg');
    setSelectedFrame('/assets/point_shop/frame/프레임샘플.png');
    setSelectedWallpaper('/assets/point_shop/wallpaper/벽지샘플.png');
  };


  // 총 금액 계산
  useEffect(() => {
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
    setTotalItemPrice(totalPrice);
  }, [selectedItems])

  // console.log(items)

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
        selectedItemType={selectedItemType}
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={tabCategoryButtonStyle}
        items={items}
        handleItemClick={handleItemClick}
        selectedItems={selectedItems}
      />

      {/* {items.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))} */}


    </>
  )
}

