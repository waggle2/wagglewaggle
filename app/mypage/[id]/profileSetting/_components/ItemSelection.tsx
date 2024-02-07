import style from './styles/profileSetting.module.scss'

type Item = {
  id: number
  src: string
  price: number
  category: 'emoji' | 'profileBg' | 'frame' | 'wallpaper'
}

type ItemSelectionProps = {
  itemCategoryTab: string
  handleCategoryClick: (category: string) => void
  tabCategoryButtonStyle: (category: string) => string
  products: Item[]
  handleItemClick: (item: Item) => void
  selectedItems: Item[]
}

export default function ItemSelection({
  itemCategoryTab,
  handleCategoryClick,
  tabCategoryButtonStyle,
  products,
  handleItemClick,
  selectedItems,
}: ItemSelectionProps) {
  return (
    <div>
      {/* 아이템 선택 */}
      <div className={style.categoryTabContainer}>
        <button
          className={tabCategoryButtonStyle('이모지')}
          onClick={() => handleCategoryClick('이모지')}
        >
          이모지
        </button>
        <button
          className={tabCategoryButtonStyle('프로필 배경')}
          onClick={() => handleCategoryClick('프로필 배경')}
        >
          프로필 배경
        </button>
        <button
          className={tabCategoryButtonStyle('프레임')}
          onClick={() => handleCategoryClick('프레임')}
        >
          프레임
        </button>
        <button
          className={tabCategoryButtonStyle('벽지')}
          onClick={() => handleCategoryClick('벽지')}
        >
          벽지
        </button>
      </div>

      <ul className={style.itemContainer}>
        {itemCategoryTab === '이모지' &&
          products
            .filter((item) => item.category === 'emoji')
            .map((item) => (
              <li
                key={item.id}
                className={style.item}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className={style.imageWrap}
                  style={
                    selectedItems.some(
                      (selectedItem) =>
                        selectedItem.id === item.id &&
                        selectedItem.category === item.category,
                    )
                      ? { border: '2px solid #7EE36E' }
                      : {}
                  }
                >
                  <img src={item.src} alt={item.src} />
                </div>
              </li>
            ))}

        {itemCategoryTab === '프로필 배경' &&
          products
            .filter((item) => item.category === 'profileBg')
            .map((item) => (
              <li
                key={item.id}
                className={style.bigItem}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className={style.imageWrap}
                  style={
                    selectedItems.some(
                      (selectedItem) =>
                        selectedItem.id === item.id &&
                        selectedItem.category === item.category,
                    )
                      ? { border: '2px solid #7EE36E' }
                      : {}
                  }
                >
                  <img src={item.src} alt={item.src} />
                </div>
              </li>
            ))}

        {itemCategoryTab === '프레임' &&
          products
            .filter((item) => item.category === 'frame')
            .map((item) => (
              <li
                key={item.id}
                className={style.bigItem}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className={style.imageWrap}
                  style={
                    selectedItems.some(
                      (selectedItem) =>
                        selectedItem.id === item.id &&
                        selectedItem.category === item.category,
                    )
                      ? { border: '2px solid #7EE36E' }
                      : {}
                  }
                >
                  <img src={item.src} alt={item.src} />
                </div>
              </li>
            ))}

        {itemCategoryTab === '벽지' &&
          products
            .filter((item) => item.category === 'wallpaper')
            .map((item) => (
              <li
                key={item.id}
                className={style.bigItem}
                onClick={() => handleItemClick(item)}
              >
                <div
                  className={style.imageWrap}
                  style={
                    selectedItems.some(
                      (selectedItem) =>
                        selectedItem.id === item.id &&
                        selectedItem.category === item.category,
                    )
                      ? { border: '2px solid #7EE36E' }
                      : {}
                  }
                >
                  <img src={item.src} alt={item.src} />
                </div>
              </li>
            ))}
      </ul>
    </div>
  )
}
