'use client'
import React, { useState, useRef, useEffect } from 'react';
import style from '../_styles/cart.module.scss';
import PointIcon from './PointIcon';
import { ItemData } from '@/app/_recoil/atoms/pointshopState';
import { useRecoilValue } from 'recoil';
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState';
import RefreshIcon from '@/public/assets/ico_refresh.svg';
import CloseIcon from '@/public/assets/point_shop/close.svg'
import EmptyIcon from '@/public/assets/point_shop/selected_empty.svg'

type CartProps = {
    cartItems: ItemData[];
    totalItemPrice: number;
    handleResetClick: () => void;
    handleRemoveItemClick: (item: number) => void;
    confirmModalToggle: () => void;
};

export default function Cart({ cartItems = [], totalItemPrice, handleResetClick, handleRemoveItemClick, confirmModalToggle }: CartProps) {
    const selectedTab = useRecoilValue(selectedTabState);
    const [isMovedUp, setIsMovedUp] = useState(false);

    const itemTypeOrder = ['이모지', '프로필 배경', '프레임', '벽지'];

    const [containerHeight, setContainerHeight] = useState(0);

    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cartRef.current) {
            setContainerHeight(cartRef.current.offsetHeight);
        }
    }, [cartItems]);

    const sortedCartItems = cartItems.filter(item => item).sort((a, b) => {
        const orderA = itemTypeOrder.indexOf(a.itemType);
        const orderB = itemTypeOrder.indexOf(b.itemType);
        return orderA - orderB;
    });

    const isCartItem = sortedCartItems.length > 0;

    const handleCartUp = () => {
        setIsMovedUp(!isMovedUp);
    };

    const dynamicStyle = isMovedUp ? { transform: `translateY(calc(-${containerHeight}px + 1px))` } : {};

    return (
        <div className={`${isMovedUp ? style.modalBackground : ''}`}>
            <div className={style.cartToggleContainer}>
                <button className={style.resetBtn} onClick={handleResetClick}>
                    <RefreshIcon className={style.refreshIcon} />
                </button>
                <button className={style.toggleBtn} onClick={handleCartUp}>장바구니 {sortedCartItems.length}</button>
            </div>

            <div className={style.cartWrapper}>
                <div ref={cartRef} className={style.selectedContainer} style={dynamicStyle}>
                    <div className={style.header}>
                        <h3>장바구니</h3>
                        <CloseIcon onClick={handleCartUp} className={style.closeBtn} />
                    </div>
                    <ul className={style.selectedItems}>
                        {isCartItem ? (
                            sortedCartItems.map((item, index) => (
                                <li key={index} className={style.item} onClick={() => handleRemoveItemClick(item.id)} >
                                    <div className={style.selectedImageBox}>
                                        <img
                                            className={
                                                item.itemType === '이모지' ? style.emoji :
                                                    item.itemType === '프로필 배경' ? style.profileBackground :
                                                        item.itemType === '프레임' ? style.frame :
                                                            item.itemType === '벽지' ? style.wallpaper : ''
                                            }
                                            src={item.image}
                                            alt=""
                                        />
                                        {item.itemType === '프로필 배경' && (
                                            <div className={style.emojiOver}>
                                                <img
                                                    className={
                                                        selectedTab === '고냥이' ? style.catClass :
                                                            selectedTab === '곰돌이' ? style.bearClass :
                                                                selectedTab === '댕댕이' ? style.dogClass :
                                                                    selectedTab === '폭스' ? style.foxClass : ''
                                                    }
                                                    src={`/assets/point_shop/emoji/${selectedTab}_default.svg`}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                        {item.itemType === '프레임' && (
                                            <div className={style.emojiOver}>
                                                <img
                                                    className={
                                                        selectedTab === '고냥이' ? style.catClass :
                                                            selectedTab === '곰돌이' ? style.bearClass :
                                                                selectedTab === '댕댕이' ? style.dogClass :
                                                                    selectedTab === '폭스' ? style.foxClass : ''
                                                    }
                                                    src={`/assets/point_shop/emoji/${selectedTab}_default.svg`}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className={style.priceCoin}>
                                        <PointIcon animal={selectedTab} /> {item.price}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className={style.emptyCart}>
                                <EmptyIcon />
                                <span>장바구니가 비어있어요</span>
                            </li>
                        )}
                    </ul>
                    <div className={style.purchaseContainer}>
                        <div className={style.totalPurchase}>
                            <span>선택 아이템 합계</span>
                            <div className={style.price}><PointIcon animal={selectedTab} />{totalItemPrice}</div>
                        </div>
                        <div className={style.purchaseFnc}>
                            <button className={style.resetBtn} onClick={handleCartUp}>
                                취소
                            </button>
                            <button className={style.purchaseBtn} onClick={confirmModalToggle}>
                                구매하기 {sortedCartItems.length}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
