import style from '../_styles/pointShop.module.scss';
import PointIcon from './PointIcon';
import { ItemData, PossesionItemData } from '@/app/_recoil/atoms/pointshopState';



type ItemSelectionProps = {
    selectedTab: string;
    selectedItemType: string;
    handleCategoryClick: (selectedItemType: string) => void;
    tabCategoryButtonStyle: (selectedItemType: string) => string;
    items: ItemData[];
    handleItemClick: (item: ItemData) => void;
    selectedItems: ItemData[];
    isLoading: boolean;
    possessionItems: PossesionItemData[];
};

export default function ItemSelection({
    selectedTab,
    selectedItemType,
    handleCategoryClick,
    tabCategoryButtonStyle,
    items,
    handleItemClick,
    selectedItems,
    isLoading,
    possessionItems
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
        items.filter(item => item.itemType === selectedItemType).reverse().map(item => {
            const isOwned = possessionItems.some(possessionItem => possessionItem.id === item.id);

            if (isOwned) {
                return (
                    <li key={item.id} className={selectedItemType === 'emoji' ? style.item : style.bigItem}>
                        <div className={style.imageWrap}>
                            <span className={style.ownedIndicator}>보유 중</span>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className={style.priceCoin}>
                            <PointIcon animal={selectedTab} /> {item.price}
                        </div>
                    </li>
                );
            } else {

                return (
                    <li key={item.id} className={selectedItemType === 'emoji' ? style.item : style.bigItem}
                        onClick={() => handleItemClick(item)}
                    >
                        <div className={style.imageWrap}
                            style={selectedItems.some(selectedItem => selectedItem.id === item.id) ? { border: '2px solid #7EE36E' } : {}}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className={style.priceCoin}>
                            <PointIcon animal={selectedTab} /> {item.price}
                        </div>
                    </li>
                );
            }
        })
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
