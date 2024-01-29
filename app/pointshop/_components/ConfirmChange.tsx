'use client'
import style from '../_styles/confirmChange.module.scss'
import Link from 'next/link'

type Props = {
    pointDifference: number,
    selectedItemsLength: number,
    onConfirmClick: () => void,
}
export default function ConfirmChange({ pointDifference, selectedItemsLength, onConfirmClick }: Props) {

    // 조건1: 상품이 담겨있고, 보유포인트 >= 상품가격 : 구매 최종 확인 모달
    // 조건2: 보유포인트-상품가격 < 0 일때 : 포인트 부족 안내 모달
    // 조건3: 상품이 담겨있지 않을 때 : 상품을 담아주세요 모달

    if (selectedItemsLength > 0) {
        if (pointDifference >= 0) {
            // 구매 가능한 경우
            return (
                <div className={style.modalBackground}>
                    <div className={style.modal}>
                        <p>현재 프로필을 <br />
                            대표 프로필로 설정할까요?</p>
                        <div className={style.buttonBox}>
                            <button className={style.yesButton}>YES</button>
                            <button onClick={onConfirmClick} className={style.noButton}>NO</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            // 포인트 부족
            return (
                <div className={style.modalBackground}>
                    <div className={style.modal}>
                        <p>포인트가 부족합니다.</p>
                        <div className={style.buttonBox}>
                            <button onClick={onConfirmClick} className={style.closeButton}>닫기</button>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        // 상품 미선택
        return (
            <div className={style.modalBackground}>
                <div className={style.modal}>
                    <p>상품을 선택해주세요.</p>
                    <div className={style.buttonBox}>
                        <button onClick={onConfirmClick} className={style.closeButton}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }
}

