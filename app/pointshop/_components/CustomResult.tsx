'use client'
import style from '../_styles/pointShop.module.scss';
import { useEffect, useState } from "react";
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';
import { cartItemsState } from '@/app/_recoil/selectors/pointshopState';
import { useRecoilState, useRecoilValue } from 'recoil';
import axiosInstance from '@/app/_api/config';


type Props = {
  selectedTab: string;
  items: ItemData[];
  selectedItemType: string;
  setSelectedItemType: (value: string) => void;
  animalCoin: number;
};

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




const CustomResult = ({ selectedTab, items, selectedItemType, setSelectedItemType, animalCoin }: Props) => {
  const [confirmModal, setConfirmModal] = useState(false);

  const { cartItems, totalCoins } = useRecoilValue(cartItemsState)

  const [possessionCoin, setPossessionCoin] = useState(animalCoin);

  const [selectedEmoji, setSelectedEmoji] = useState('/assets/point_shop/emoji/cat_smile.svg');
  const [selectedProfileBg, setSelectedProfileBg] = useState('/assets/point_shop/profile_background/프로필배경1.svg');
  const [selectedFrame, setSelectedFrame] = useState('/assets/point_shop/frame/프레임샘플.png');
  const [selectedWallpaper, setSelectedWallpaper] = useState('/assets/point_shop/wallpaper/벽지샘플.png');
  const pointDifference = possessionCoin - totalCoins;

  console.log(cartItems)

  // 아이템을 장바구니에 추가하는 함수
  const addItemToCart = async (itemId: number, animal: string) => {
    try {
      const response = await axiosInstance.post(`items/cart/${itemId}?animal=${animal}`);
      console.log(response.data.message);

    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  // 아이템을 장바구니에서 제거하는 함수
  const removeItemFromCart = async (itemId: number, animal: string) => {
    try {
      const response = await axiosInstance.delete(`items/cart/${itemId}?animal=${animal}`);
      console.log(response.data.message); // 장바구니에서 선택한 아이템이 삭제되었습니다.

    } catch (error) {
      console.log('장바구니에서 아이템 삭제 실패');
      console.log(error);
    }
  };

  // 모든 아이템을 장바구니에서 제거하는 함수
  const removeAllItemFromCart = async (animal: string) => {
    try {
      const response = await axiosInstance.delete(`items/cart?animal=${animal}`);
      console.log(response.data.message);
    } catch (error) {
      console.log('장바구니에서 아이템 삭제 실패');

    }
  };



  const handleConfirmModalClick = () => {
    setConfirmModal(!confirmModal);
  };

  const handleCategoryClick = (itemType: string) => {
    setSelectedItemType(itemType);
  };

  const tabCategoryButtonStyle = (itemType: string) => {
    return itemType === selectedItemType ? `${style.tabButton} ${style.active}` : style.tabButton;
  };

  const handleItemClick = (item: ItemData) => {
    // 장바구니에 아이템 추가
    addItemToCart(item.id, selectedTab);
  };

  const handleRefreshClick = () => {

    removeAllItemFromCart(selectedTab)
    setSelectedEmoji('/assets/point_shop/emoji/cat_smile.svg');
    setSelectedProfileBg('/assets/point_shop/profile_background/프로필배경1.svg');
    setSelectedFrame('/assets/point_shop/frame/프레임샘플.png');
    setSelectedWallpaper('/assets/point_shop/wallpaper/벽지샘플.png');
  };


  return (
    <>
      {confirmModal && <ConfirmChange
        pointDifference={pointDifference}
        selectedItemsLength={cartItems.length}
        onConfirmClick={handleConfirmModalClick} />}

      <CustomPreview
        selectedTab={selectedTab}
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        possessionCoin={animalCoin}
        handleConfirmModalClick={handleConfirmModalClick}
        handleRefreshClick={handleRefreshClick} />

      <Cart
        selectedTab={selectedTab}
        selectedItems={cartItems}
        totalItemPrice={totalCoins} />

      <ItemSelection
        selectedTab={selectedTab}
        selectedItemType={selectedItemType}
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={tabCategoryButtonStyle}
        items={items}
        handleItemClick={handleItemClick}
        selectedItems={cartItems} />
    </>
  );
};

export default CustomResult;


