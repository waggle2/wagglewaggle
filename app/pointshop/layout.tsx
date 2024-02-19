import { ReactNode } from "react"
import style from '@/app/pointshop/_styles/pointShop.module.scss'
import RecoilProvider from "../_recoil/RecoilProvider";

type Props = { children: ReactNode, modal: ReactNode };

export default function PointShopLayout({ children, modal }: Props) {

    return (
        <RecoilProvider>
            <div className={style.container}>
                {children}
                {modal}
            </div>
        </RecoilProvider>
    )
}

