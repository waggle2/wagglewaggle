import style from '../_styles/pointShop.module.scss';
import PointIcon from './PointIcon';

type Item = {
    id: number,
    src: string,
    price: number,
    category: 'emoji' | 'profileBg' | 'frame' | 'wallpaper',
};

type ItemSelectionProps = {
    itemCategoryTab: string;
    handleCategoryClick: (category: string) => void;
    tabCategoryButtonStyle: (category: string) => string;
    products: Item[];
    handleItemClick: (item: Item) => void;
    selectedItems: Item[];
};

export default function ItemSelection({
    itemCategoryTab,
    handleCategoryClick,
    tabCategoryButtonStyle,
    products,
    handleItemClick,
    selectedItems,
}: ItemSelectionProps) {
    const renderCategoryButton = (category: string, label: string) => (
        <button
            className={tabCategoryButtonStyle(category)}
            onClick={() => handleCategoryClick(category)}
        >
            {label}
        </button>
    );

    const renderItemsForCategory = (category: string) => (
        products.filter(item => item.category === category).map(item => (
            <li key={item.id} className={category === 'emoji' ? style.item : style.bigItem}
                onClick={() => handleItemClick(item)}>
                <div className={style.imageWrap}
                    style={selectedItems.some(selectedItem => selectedItem.id === item.id) ? { border: '2px solid #7EE36E' } : {}}
                >
                    <img src={item.src} alt={item.src} />
                </div>
                <div className={style.priceCoin}>
                    <PointIcon /> {item.price}
                </div>
            </li>
        ))
    );

    return (
        <div>
            <div className={style.categoryTabContainer}>
                {renderCategoryButton('emoji', '이모지')}
                {renderCategoryButton('profileBg', '프로필 배경')}
                {renderCategoryButton('frame', '프레임')}
                {renderCategoryButton('wallpaper', '벽지')}

            </div>
            <ul className={style.itemContainer}>
                {renderItemsForCategory(itemCategoryTab)}
            </ul>
        </div>
    );
}
