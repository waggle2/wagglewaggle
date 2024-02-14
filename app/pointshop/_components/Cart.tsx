import style from '../_styles/pointShop.module.scss'
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
type CartProps = {
    selectedTab: string;
    selectedItems: ItemData[];
    totalItemPrice: number;
};

export default function Cart({ selectedTab, selectedItems, totalItemPrice }: CartProps) {
    return (
        <div>
            {/* 장바구니 */}
            <div className={style.selectedContainer}>
                <ul className={style.selectedItems}>
                    {selectedItems && selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <li key={index} className={style.item}>
                                <div className={style.selectedImageBox}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={style.priceCoin}>
                                    <PointIcon animal={selectedTab} /> {item.price}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className={style.item}>
                            <div className={style.selectedImageBox}>
                                <img src="/아이템.png" alt="" />
                            </div>
                            <div className={style.priceCoin}>
                                <PointIcon animal={selectedTab} /> {0}
                            </div>
                        </li>
                    )}
                </ul>
                <div className={style.totalPriceWrap}>
                    <div className={style.totalPrice}>
                        <span>TOTAL</span>
                        <PointIcon animal={selectedTab} />{totalItemPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

