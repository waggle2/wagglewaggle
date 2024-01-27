'use client'
import { useState } from 'react'
import style from '../_styles/confirmChange.module.scss'
import Link from 'next/link'

type Props = {
    pointDifference: number,
    selectedItemsLength: number,
    onConfirmClick: () => void,
}
export default function ConfirmChange({ pointDifference, selectedItemsLength, onConfirmClick }: Props) {
    const [applyModal, setApplyModal] = useState(false);
    const [applyProfile, setApplyProfile] = useState(false);

    const applyModalHandler = () => {
        setApplyModal(true);
    }

    // 조건1: 상품이 담겨있고, 보유포인트 >= 상품가격 : 구매 최종 확인 모달
    // 조건2: 보유포인트-상품가격 < 0 일때 : 포인트 부족 안내 모달
    // 조건3: 상품이 담겨있지 않을 때 : 상품을 담아주세요 모달

    if (selectedItemsLength > 0) {
        if (pointDifference >= 0) {
            // 구매 가능한 경우
            return (
                <div className={style.modalBackground}>
                    <div className={style.modal}>
                        {!applyModal ? (
                            <>
                                <div className={style.textBox}>
                                    <h4>아이템 구매</h4>
                                    <span>선택하신 아이템을 구매하시겠어요?</span>
                                </div>
                                <div className={style.buttonBox}>
                                    <button
                                        className={style.noButton}
                                        onClick={onConfirmClick}>
                                        취소
                                    </button>
                                    <button
                                        className={style.yesButton}
                                        onClick={applyModalHandler}
                                    >
                                        구매하기
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={style.textBox}>
                                    <h4>구매 완료</h4>
                                    <span>
                                        구매가 완료되었습니다. 잔여 고냥이포인트 : {pointDifference}
                                    </span>
                                </div>
                                <div className={style.buttonBox}>
                                    <button
                                        className={style.noButton}
                                        onClick={onConfirmClick}>
                                        프로필 유지하기
                                    </button>
                                    <button
                                        className={style.yesButton}
                                        onClick={applyModalHandler}
                                    >
                                        프로필 설정하기
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            );
        } else {
            // 포인트 부족
            return (
                <div className={style.modalBackground}>
                    <div className={style.modal}>
                        <div className={style.textBox}>
                            <h4>구매 실패</h4>
                            <span>잔여 포인트가 부족해 구입할 수 없어요.</span>
                        </div>
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
                    <div className={style.textBox}>
                        <h4>구매 실패</h4>
                        <span>선택하신 아이템이 없어요.</span>
                    </div>
                    <div className={style.buttonBox}>
                        <button onClick={onConfirmClick} className={style.closeButton}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }


}

