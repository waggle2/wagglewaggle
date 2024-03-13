import style from '@/app/_styles/layout.module.scss'
import LoadingPage from './_components/loading/LoadingPage'

export default function Loading() {
    return (
        <div className={style.container}>
            <LoadingPage />
        </div>

    )
}