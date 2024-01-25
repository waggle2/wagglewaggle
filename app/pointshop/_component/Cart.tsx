import style from './pointShop.module.scss'
import PointIcon from './PointIcon';

type Item = {
    id: number;
    src: string;
    price: number;
    category: 'emoji' | 'profileBg' | 'frame' | 'wallpaper';
};

type CartProps = {
    selectedItems: Item[];
    totalItemPrice: number;
};

export default function Cart({ selectedItems, totalItemPrice }: CartProps) {
    return (
        <div>
            {/* 장바구니 */}
            <div className={style.selectedContainer}>
                <ul className={style.selectedItems}>
                    {selectedItems && selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <li key={index} className={style.item}>
                                <div className={style.selectedImageBox}>
                                    <img src={item.src} alt="" />
                                </div>
                                <div className={style.priceCoin}>
                                    <PointIcon /> {item.price}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className={style.item}>
                            <div className={style.selectedImageBox}>
                                <img src="/아이템.png" alt="" />
                            </div>
                            <div className={style.priceCoin}>
                                <PointIcon /> {0}
                            </div>
                        </li>
                    )}
                </ul>
                <div className={style.totalPriceWrap}>
                    <div className={style.totalPrice}>
                        <span>TOTAL</span>
                        <PointIcon />{totalItemPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

