import style from '../_styles/pointShop.module.scss';
import PointIcon from './PointIcon';
import { ItemData, PossesionItemData } from '@/app/_recoil/atoms/pointshopState';
import OwnedIcon from '@/public/assets/point_shop/owned-item.svg'
import SelectedIcon from '@/public/assets/point_shop/selected-item.svg'



type ItemSelectionProps = {
    selectedTab: string;
    selectedItemType: string;
    handleCategoryClick: (selectedItemType: string) => void;
    tabCategoryButtonStyle: (selectedItemType: string) => string;
    items: ItemData[];
    handleItemClick: (item: ItemData) => void;
    handleRemoveItemClick: (item: number) => void;
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
    handleRemoveItemClick,
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
            const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);

            if (isOwned) {
                return (
                    <li key={item.id} className={selectedItemType === 'emoji' ? style.item : style.bigItem}>
                        <div className={style.imageWrap}>
                            <div className={style.itemIndicator}><OwnedIcon /></div>
                            <img src={item.image} alt={item.name} className={isOwned ? style.owned : ''} />
                        </div>
                        <div className={style.priceCoin}>
                            <PointIcon animal={selectedTab} /> {item.price}
                        </div>
                    </li>
                );
            } else {

                return (
                    <li key={item.id} className={selectedItemType === 'emoji' ? style.item : style.bigItem}
                        onClick={() => isSelected ? handleRemoveItemClick(item.id) : handleItemClick(item)}
                    >
                        <div className={style.imageWrap}
                            style={isSelected ? { border: '2px solid #7EE36E' } : {}}
                        >
                            {isSelected && <div className={style.itemIndicator}><SelectedIcon /></div>}
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
        <div className={style.itemSelectionWrapper}>
            <div className={style.categoryTabContainer}>
                {renderCategoryButton('emoji', '이모지')}
                {renderCategoryButton('background', '프로필 배경')}
                {renderCategoryButton('frame', '프레임')}
                {renderCategoryButton('wallpaper', '벽지')}
            </div>
            <div className={style.itemWrapper}>
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
        </div>
    );
}
