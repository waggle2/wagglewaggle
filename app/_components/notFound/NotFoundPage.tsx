import Footer from '../common/footer/Footer'
import style from './notFoundPage.module.scss'
import DefaultLogo from '/public/assets/defaultLogo.svg'
export default function NotFoundPage() {
    return (
        <>
            <div className={style.notFondContainer}>
                <div className={style.number}>404</div>
                <DefaultLogo className={style.logo} />
                <h5>페이지를 찾을 수 없습니다.</h5>
                <span>페이지가 존재하지 않거나, 삭제된 페이지입니다.</span>
            </div>
            <Footer />
        </>
    )
}

