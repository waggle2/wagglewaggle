import style from './styles/itemSelection.module.scss'

import { avatarItemList, wearingItem, avatarItem } from './types/responseType'
import { useState } from 'react'
import CategoryButton from './view/CategoryButton'

import cs from 'classnames/bind'
import BackgroundPrev from './BackgroundPrev'
type props = {
  animal?: string | null
  itemList: avatarItemList
  wearingItem: any
  setWearingItem: React.Dispatch<React.SetStateAction<wearingItem>>
}

export default function ItemSelection({
  animal,
  itemList = [],
  wearingItem = {
    emoji: null,
    background: null,
    frame: null,
    wallpaper: null,
  },
  setWearingItem,
}: props) {
  const cx = cs.bind(style)
  const [selectedItemType, setSelectedItemType] = useState('emoji')
  const ITEMTYPE = ['emoji', 'background', 'frame', 'wallpaper']
  const handleChangeCategory = (category: string) => {
    setSelectedItemType(category)
  }
  const handleUnsetWearing = () => {
    setWearingItem((prev) => {
      return { ...prev, [selectedItemType]: null }
    })
  }
  console.log(itemList, 'itemList')
  const handleWearingItem = (item: avatarItem) => {
    setWearingItem((prev) => {
      return { ...prev, [selectedItemType]: item }
    })
  }

  return (
    <>
      <div className={style.itemSelectionWrapper}>
        {/* 카테고리 탭 */}
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
      {/* 아이템 렌더링 */}
      <div className={style.itemWrapper}>
        <ul className={style.itemContainer}>
          <li className={selectedItemType === 'wallpaper' ? style.bigItem : style.item}>
            <div
              className={cx(
                'imageWrap',
                !wearingItem[`${selectedItemType}`]?.id && 'selected',
              )}
            >
              <img
                className={style.itemUnset}
                src={'/assets/point_shop/item_unset.svg'}
                alt={'unsetIcon'}
                onClick={handleUnsetWearing}
              />
            </div>
          </li>
          {itemList
            .filter((itemList) => {
              switch (selectedItemType) {
                case 'emoji':
                  return itemList.itemType === '이모지'

                case 'background':
                  return itemList.itemType === '프로필 배경'

                case 'frame':
                  return itemList.itemType === '프레임'

                case 'wallpaper':
                  return itemList.itemType === '벽지'
              }
            })
            .map((item) => {
              return (
                <li
                  key={item.id}
                  className={`${selectedItemType === 'wallpaper' ? style.bigItem : style.item} }`}
                  onClick={() => {
                    handleWearingItem(item)
                  }}
                >
                  <div
                    className={cx(
                      'imageWrap',
                      wearingItem[`${selectedItemType}`] &&
                      wearingItem[`${selectedItemType}`].id === item.id &&
                      'selected',
                    )}
                  >
                    <div className={`${selectedItemType === 'background' ? style.backgroundWrap : ''}`}>
                      {selectedItemType === 'background' && (
                        // ? (
                        //   <BackgroundPrev animal={animal} src={item.image} />
                        // ) : (
                        //   // <img
                        //   //   className={style.itemImage}
                        //   //   src={item.image}
                        //   //   alt={item.name}
                        //   //   />
                        <img
                          className={`${style.defaultEmoji} ${selectedItemType === 'background'
                            ? animal === '고냥이'
                              ? style.catDefault
                              : animal === '곰돌이'
                                ? style.bearDefault
                                : animal === '댕댕이'
                                  ? style.dogDefault
                                  : animal === '폭스'
                                    ? style.foxDefault
                                    : ''
                            : ''
                            }`}
                          src={`/assets/point_shop/emoji/${animal}_default.svg`}
                          alt=""
                        />
                      )}
                      <img
                        className={
                          selectedItemType === 'background'
                            ? style.backgroundItemImage
                            : selectedItemType === '이모지' && animal === '댕댕이'
                              ? style.dogItemImage
                              : animal === '폭스'
                                ? style.foxItemImage
                                : style.itemImage
                        }
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}
