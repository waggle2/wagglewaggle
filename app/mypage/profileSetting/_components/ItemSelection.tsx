import style from './styles/itemSelection.module.scss'

import { avatarItemList } from './types/responseType'
import { useState } from 'react'
import CategoryButton from './view/CategoryButton'
type props = {
  itemList: avatarItemList
}

export default function ItemSelection({ itemList }: props) {
  const [selectedItemType, setSelectedItemType] = useState('이모지')
  const ITEMTYPE = ['이모지', '프로필 배경', '프레임', '벽지']
  const handleChangeCategory = (category: string) => {
    setSelectedItemType(category)
  }

  // const renderItemsForCategory = (selectedItemType: string) =>
  //   items
  //     .filter((item) => item.itemType === selectedItemType)
  //     .reverse()
  //     .map((item) => {
  //       const isOwned = possessionItems.some(
  //         (possessionItem) => possessionItem.id === item.id,
  //       )
  //       const isSelected = selectedItems.some(
  //         (selectedItem) => selectedItem.id === item.id,
  //       )

  //       return (
  //         <li
  //           key={item.id}
  //           className={`${selectedItemType === 'emoji' ? style.item : style.bigItem} ${isOwned ? style.owned : ''}`}
  //           onClick={() => {
  //             if (!isOwned) {
  //               isSelected
  //                 ? handleRemoveItemClick(item.id)
  //                 : handleItemClick(item)
  //             }
  //           }}
  //           style={
  //             isSelected
  //               ? { border: '2px solid #7EE36E', borderRadius: '8px' }
  //               : {}
  //           }
  //         >
  //           <div className={style.imageWrap}>
  //             <img
  //               className={style.itemImage}
  //               src={item.image}
  //               alt={item.name}
  //             />
  //           </div>
  //         </li>
  //       )
  //     })

  return (
    <>
      <div className={style.itemSelectionWrapper}>
        <div className={style.categoryTabContainer}>
          {ITEMTYPE.map((category) => (
            <CategoryButton
              key={category}
              selectedTab={selectedItemType}
              category={category}
              handleTabClick={() => {
                handleChangeCategory(category)
              }}
            />
          ))}
        </div>
      </div>
      <div className={style.itemWrapper}>
        <ul className={style.itemContainer}>
          {/* {renderItemsForCategory(selectedItemType)} */}
        </ul>
      </div>
    </>
  )
}
