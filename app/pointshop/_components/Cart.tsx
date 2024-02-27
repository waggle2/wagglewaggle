import style from '../_styles/pointShop.module.scss';
import PointIcon from './PointIcon';
import { ItemData } from '@/app/_recoil/atoms/pointshopState';
import { useRecoilValue } from 'recoil'
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState'

type CartProps = {
    cartItems: ItemData[];
    totalItemPrice: number;
    handleResetClick: () => void;
    confirmModalToggle: () => void;
};

export default function Cart({ cartItems, totalItemPrice, handleResetClick, confirmModalToggle }: CartProps) {
    const selectedTab = useRecoilValue(selectedTabState)

    const itemTypeOrder = ['emoji', 'background', 'frame', 'wallpaper'];

    const sortedCartItems = cartItems.sort((a, b) => {
        const orderA = itemTypeOrder.indexOf(a.itemType);
        const orderB = itemTypeOrder.indexOf(b.itemType);
        return orderA - orderB;
    });

    const isCartItem = sortedCartItems.length > 0;

    return (
        <div>
            {/* 장바구니 */}
            <div className={style.selectedContainer}>
                <ul className={style.selectedItems}>
                    {isCartItem ? (
                        sortedCartItems.map((item, index) => (
                            <li key={index} className={style.item} >
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
                            <div className={style.selectedImageBox}></div>
                            <div className={style.priceCoin}>
                                <PointIcon animal={selectedTab} /> {0}
                            </div>
                        </li>
                    )}
                </ul>
                <div className={style.cartFnc}>
                    {isCartItem && <button className={style.resetBtn} onClick={handleResetClick}>RESET</button>}
                    <button className={style.purchaseBtn} onClick={confirmModalToggle}>
                        <span>BUY</span>
                        <PointIcon animal={selectedTab} />{totalItemPrice}
                    </button>
                </div>
            </div>
        </div>
    )
}
