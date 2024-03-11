import style from './styles/itemSelection.module.scss'

import { ItemData, PossesionItemData } from '@/app/_recoil/atoms/pointshopState'
import { useRecoilValue } from 'recoil'
import { selectedItemTypeState } from '@/app/_recoil/atoms/pointshopState'

type ItemSelectionProps = {
  handleCategoryClick: (selectedItemType: string) => void
  items: ItemData[]
  handleItemClick: (item: ItemData) => void
  handleRemoveItemClick: (item: number) => void
  selectedItems: ItemData[]
  isLoading: boolean
  possessionItems: PossesionItemData[]
}

export default function ItemSelection({
  handleCategoryClick,
  items,
  handleItemClick,
  handleRemoveItemClick,
  selectedItems,
  isLoading,
  possessionItems,
}: ItemSelectionProps) {
  const selectedItemType = useRecoilValue(selectedItemTypeState)

  const renderCategoryButton = (itemType: string, label: string) => (
    <button
      className={
        itemType === selectedItemType
          ? `${style.tabButton} ${style.active}`
          : style.tabButton
      }
      onClick={() => handleCategoryClick(itemType)}
    >
      {label}
    </button>
  )

  const renderItemsForCategory = (selectedItemType: string) =>
    items
      .filter((item) => item.itemType === selectedItemType)
      .reverse()
      .map((item) => {
        const isOwned = possessionItems.some(
          (possessionItem) => possessionItem.id === item.id,
        )
        const isSelected = selectedItems.some(
          (selectedItem) => selectedItem.id === item.id,
        )

        return (
          <li
            key={item.id}
            className={`${selectedItemType === 'emoji' ? style.item : style.bigItem} ${isOwned ? style.owned : ''}`}
            onClick={() => {
              if (!isOwned) {
                isSelected
                  ? handleRemoveItemClick(item.id)
                  : handleItemClick(item)
              }
            }}
            style={
              isSelected
                ? { border: '2px solid #7EE36E', borderRadius: '8px' }
                : {}
            }
          >
            <div className={style.imageWrap}>
              <img
                className={style.itemImage}
                src={item.image}
                alt={item.name}
              />
            </div>
          </li>
        )
      })

  console.log(selectedItems)
  return (
    <>
      <div className={style.itemSelectionWrapper}>
        <div className={style.categoryTabContainer}>
          {renderCategoryButton('emoji', '이모지')}
          {renderCategoryButton('background', '프로필 배경')}
          {renderCategoryButton('frame', '프레임')}
          {renderCategoryButton('wallpaper', '벽지')}
        </div>
      </div>
      <div className={style.itemWrapper}>
        {isLoading ? (
          <div className={style.loadingContainer}>LOADING</div>
        ) : (
          <ul className={style.itemContainer}>
            {renderItemsForCategory(selectedItemType)}
          </ul>
        )}
      </div>
    </>
  )
}
