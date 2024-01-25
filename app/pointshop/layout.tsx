import { ReactNode } from "react"
import style from '@/app/pointshop/_component/point.module.scss'

type Props = { children: ReactNode, modal: ReactNode };

export default function PointShopLayout({ children, modal }: Props) {

    return (
        <div className={style.container}>
            {children}
            {modal}
        </div>


    )
}

