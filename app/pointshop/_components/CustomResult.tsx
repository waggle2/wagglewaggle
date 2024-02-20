'use client'

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import axiosInstance from '@/app/_api/config';
import style from '../_styles/pointShop.module.scss';
import ConfirmChange from './ConfirmChange';
import CustomPreview from './CustomPreview';
import Cart from './Cart';
import ItemSelection from './ItemSelection';
import { cartItemsState } from '@/app/_recoil/selectors/pointshopState';
import { ItemData, CartData } from '@/app/_recoil/atoms/pointshopState';

type Props = {
  selectedTab: string;
  items: ItemData[];
  selectedItemType: string;
  setSelectedItemType: (value: string) => void;
  animalCoin: number;
};

const CustomResult = ({
  selectedTab,
  items,
  selectedItemType,
  setSelectedItemType,
  animalCoin
}: Props) => {

  const [confirmModal, setConfirmModal] = useState(false);
  const cartData = useRecoilValue(cartItemsState);

  const [cartItems, setCartItems] = useState<ItemData[]>(cartData.cartItems);
  const [totalCoins, setTotalCoins] = useState<number>(cartData.totalCoins);



  const [selectedEmoji, setSelectedEmoji] = useState('/assets/point_shop/emoji/cat_smile.svg');
  const [selectedProfileBg, setSelectedProfileBg] = useState('/assets/point_shop/profile_background/프로필배경1.svg');
  const [selectedFrame, setSelectedFrame] = useState('/assets/point_shop/frame/프레임샘플.png');
  const [selectedWallpaper, setSelectedWallpaper] = useState('/assets/point_shop/wallpaper/벽지샘플.png');
  const pointDifference = animalCoin - cartData.totalCoins;



  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: async ({ itemId, animal }: { itemId: number; animal: string }) => {
      console.log('Adding item:', itemId, 'for animal:', animal);
      await axiosInstance.post(`/items/cart/${itemId}?animal=${animal}`);
    },
    onSuccess: async () => {
      console.log('Item added successfully');
      await queryClient.invalidateQueries({ queryKey: ['cartItemsState'] });
      const updatedCartData: CartData | undefined = await queryClient.getQueryData(['cartItemsState']);
      if (updatedCartData && 'cartItems' in updatedCartData && 'totalCoins' in updatedCartData) {
        setCartItems(updatedCartData.cartItems);
        setTotalCoins(updatedCartData.totalCoins);
      }
    }
  });

  const removeItemMutation = useMutation({
    mutationFn: async ({ itemId, animal }: { itemId: number; animal: string }) => {
      console.log('Removing item:', itemId, 'for animal:', animal);
      await axiosInstance.delete(`/items/cart/${itemId}?animal=${animal}`);
    },
    onSuccess: async () => {
      console.log('Item removed successfully');
      await queryClient.invalidateQueries({ queryKey: ['cartItemsState'] });
      const updatedCartData: CartData | undefined = await queryClient.getQueryData(['cartItemsState']);
      if (updatedCartData && 'cartItems' in updatedCartData && 'totalCoins' in updatedCartData) {
        setCartItems(updatedCartData.cartItems);
        setTotalCoins(updatedCartData.totalCoins);
      }
    }
  });

  // 전체 아이템 제거
  const removeAllItemsMutation = useMutation({
    mutationFn: (animal: string) => {
      console.log('Removing all items for animal:', animal);
      return axiosInstance.delete(`/items/cart?animal=${animal}`);
    },
    onSuccess: async () => {
      console.log('All items removed successfully');
      await queryClient.invalidateQueries({ queryKey: ['cartItemsState'] });
      const updatedCartData: CartData | undefined = await queryClient.getQueryData(['cartItemsState']);
      if (updatedCartData && 'cartItems' in updatedCartData && 'totalCoins' in updatedCartData) {
        setCartItems(updatedCartData.cartItems);
        setTotalCoins(updatedCartData.totalCoins);
      }
    }
  });

  // 함수들 정의
  const handleConfirmModalClick = () => setConfirmModal(!confirmModal);
  const handleCategoryClick = (itemType: string) => setSelectedItemType(itemType);
  const handleRefreshClick = () => removeAllItemsMutation.mutate(selectedTab);

  const handleItemClick = (item: ItemData) => {
    // 이미 카트에 같은 itemType의 아이템이 있는지 확인
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.itemType === item.itemType);
    if (existingItemIndex !== -1) {
      // 같은 itemType의 아이템이 이미 담겨 있다면 제거
      handleRemoveItemClick(cartItems[existingItemIndex].id);
    }
    // 새로운 아이템 추가
    addItemMutation.mutate({ itemId: item.id, animal: selectedTab });
  };

  // 아이템 제거 함수 수정
  const handleRemoveItemClick = (itemId: number) => {
    removeItemMutation.mutate({ itemId, animal: selectedTab });
  };

  return (
    <>
      {confirmModal && (
        <ConfirmChange
          pointDifference={pointDifference}
          selectedItemsLength={cartItems.length}
          onConfirmClick={handleConfirmModalClick}
        />
      )}

      <CustomPreview
        selectedTab={selectedTab}
        selectedEmoji={selectedEmoji}
        selectedProfileBg={selectedProfileBg}
        selectedFrame={selectedFrame}
        selectedWallpaper={selectedWallpaper}
        possessionCoin={animalCoin}
        handleConfirmModalClick={handleConfirmModalClick}
        handleRefreshClick={handleRefreshClick}
      />

      <Cart
        selectedTab={selectedTab}
        cartItems={cartItems}
        totalItemPrice={totalCoins}
      />

      <ItemSelection
        selectedTab={selectedTab}
        selectedItemType={selectedItemType}
        handleCategoryClick={handleCategoryClick}
        tabCategoryButtonStyle={(itemType: string) =>
          itemType === selectedItemType ? `${style.tabButton} ${style.active}` : style.tabButton
        }
        items={items}
        handleItemClick={handleItemClick}
        selectedItems={cartItems}
      />
    </>
  );
};

export default CustomResult;
