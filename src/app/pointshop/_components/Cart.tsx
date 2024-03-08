import React, { useState, useRef, useEffect } from 'react'
import style from '../_styles/cart.module.scss'
import PointIcon from './PointIcon'
import { ItemData } from '@/app/_recoil/atoms/pointshopState'
import { useRecoilValue } from 'recoil'
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState'
import RefreshIcon from '/public/assets/ico_refresh.svg'
import CloseIcon from '/public/assets/point_shop/close.svg'
import EmptyIcon from '/public/assets/point_shop/selected_empty.svg'
type CartProps = {
  cartItems: ItemData[]
  totalItemPrice: number
  handleResetClick: () => void
  handleRemoveItemClick: (item: number) => void
  confirmModalToggle: () => void
}

export default function Cart({
  cartItems,
  totalItemPrice,
  handleResetClick,
  handleRemoveItemClick,
  confirmModalToggle,
}: CartProps) {
  const selectedTab = useRecoilValue(selectedTabState)
  const [isMovedUp, setIsMovedUp] = useState(false)

  const itemTypeOrder = ['emoji', 'background', 'frame', 'wallpaper']

  const [containerHeight, setContainerHeight] = useState(0)

  const cartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cartRef.current) {
      setContainerHeight(cartRef.current.offsetHeight)
    }

    console.log(containerHeight)
  }, [cartItems])

  const sortedCartItems = cartItems.sort((a, b) => {
    const orderA = itemTypeOrder.indexOf(a.itemType)
    const orderB = itemTypeOrder.indexOf(b.itemType)
    return orderA - orderB
  })

  const isCartItem = sortedCartItems.length > 0

  const handleCartUp = () => {
    setIsMovedUp(!isMovedUp)
  }

  const dynamicStyle = isMovedUp
    ? { transform: `translateY(calc(-${containerHeight}px + 1px))` }
    : {}

  return (
    <div className={`${isMovedUp ? style.modalBackground : ''}`}>
      <div className={style.cartToggleContainer}>
        <button className={style.resetBtn} onClick={handleResetClick}>
          <RefreshIcon className={style.refreshIcon} />
        </button>
        <button className={style.toggleBtn} onClick={handleCartUp}>
          장바구니 {sortedCartItems.length}
        </button>
      </div>

      <div className={style.cartWrapper}>
        {/* 장바구니 */}
        <div
          ref={cartRef}
          className={style.selectedContainer}
          style={dynamicStyle}
        >
          <div className={style.header}>
            <h3>장바구니</h3>
            <CloseIcon onClick={handleCartUp} />
          </div>
          <ul className={style.selectedItems}>
            {isCartItem ? (
              sortedCartItems.map((item, index) => (
                <li
                  key={index}
                  className={style.item}
                  onClick={() => handleRemoveItemClick(item.id)}
                >
                  <div className={style.selectedImageBox}>
                    <img
                      className={
                        item.itemType === 'emoji' ? style.emojiImg : ''
                      }
                      src={item.image}
                      alt=""
                    />
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
              <div className={style.price}>
                <PointIcon animal={selectedTab} />
                {totalItemPrice}
              </div>
            </div>
            <div className={style.purchaseFnc}>
              <button className={style.resetBtn} onClick={handleCartUp}>
                취소
              </button>
              <button
                className={style.purchaseBtn}
                onClick={confirmModalToggle}
              >
                구매하기 {sortedCartItems.length}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
