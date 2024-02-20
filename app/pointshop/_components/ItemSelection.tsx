import style from '../_styles/pointShop.module.scss';
import PointIcon from './PointIcon';

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

type ItemSelectionProps = {
    selectedTab: string;
    selectedItemType: string;
    handleCategoryClick: (selectedItemType: string) => void;
    tabCategoryButtonStyle: (selectedItemType: string) => string;
    items: ItemData[];
    handleItemClick: (item: ItemData) => void;
    selectedItems: ItemData[];
    isLoading: boolean;
};

export default function ItemSelection({
    selectedTab,
    selectedItemType,
    handleCategoryClick,
    tabCategoryButtonStyle,
    items,
    handleItemClick,
    selectedItems,
    isLoading
}: ItemSelectionProps) {

    const renderCategoryButton = (selectedItemType: string, label: string) => (
        <button
            className={tabCategoryButtonStyle(selectedItemType)}
            onClick={() => handleCategoryClick(selectedItemType)}
        >
            {label}
        </button>
    );

    const renderItemsForCategory = (selectedItemType: string) => (
        items.filter(item => item.itemType === selectedItemType).reverse().map(item => (
            <li key={item.id} className={selectedItemType === 'emoji' ? style.item : style.bigItem}
                onClick={() => handleItemClick(item)}
            >
                <div className={style.imageWrap}
                    style={selectedItems.some(selectedItem => selectedItem.id === item.id) ? { border: '2px solid #7EE36E' } : {}}
                >
                    <img src={item.image} alt={item.image} />
                </div>
                <div className={style.priceCoin}>
                    <PointIcon animal={selectedTab} /> {item.price}
                </div>
            </li>
        ))
    );

    return (
        <div>
            <div className={style.categoryTabContainer}>
                {renderCategoryButton('emoji', '이모지')}
                {renderCategoryButton('background', '프로필 배경')}
                {renderCategoryButton('frame', '프레임')}
                {renderCategoryButton('wallpaper', '벽지')}
            </div>
            {isLoading ? (
                <div className={style.loadingContainer}>
                    LOADING
                </div>
            ) : (
                <ul className={style.itemContainer}>
                    {renderItemsForCategory(selectedItemType)}
                </ul>
            )}
        </div>
    );
}
