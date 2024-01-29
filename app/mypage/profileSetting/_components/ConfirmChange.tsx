'use client'
import style from './styles/confirmChange.module.scss'

type Props = {
  selectedItemsLength: number
  onConfirmClick: () => void
}
export default function ConfirmChange({
  selectedItemsLength,
  onConfirmClick,
}: Props) {
  // 조건1: 상품이 담겨있을 때
  // 조건3: 상품이 담겨있지 않을 때 : 상품을 담아주세요 모달

  if (selectedItemsLength > 0) {
    // 구매 가능한 경우
    return (
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <p>현재 프로필을 수정 할까요?</p>
          <div className={style.buttonBox}>
            <button className={style.yesButton}>YES</button>
            <button onClick={onConfirmClick} className={style.noButton}>
              NO
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    // 상품 미선택
    return (
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <p>상품을 선택해주세요.</p>
          <div className={style.buttonBox}>
            <button onClick={onConfirmClick} className={style.closeButton}>
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  }
}
