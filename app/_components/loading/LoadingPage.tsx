import style from './loadingPage.module.scss'
import LoadingSpinner from '/public/assets/loadingSpinner.svg'
export default function LoadingPage() {
  return (
    <>
      <div className={style.loadingContainer}>
        <div className={style.loadingBox}>
          <LoadingSpinner className={style.loadingSpinner} />
        </div>
      </div>
    </>
  )
}
