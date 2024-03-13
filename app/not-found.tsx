import style from '@/app/_styles/layout.module.scss'
import NotFoundPage from './_components/notFound/NotFoundPage'
export default function NotFound() {
    return (
        <div className={style.container}>
            <NotFoundPage />
        </div>
    )
}