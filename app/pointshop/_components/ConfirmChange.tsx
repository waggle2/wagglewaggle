'use client'
import { useState } from 'react'
import style from '../_styles/confirmChange.module.scss'
import { AnimalTab, ItemData } from '@/app/_recoil/atoms/pointshopState'
import { checkoutAnimalCartItems, updateProfileItems } from '../_service/usePointshopData'
import { useRouter } from 'next/navigation'

type Props = {
    selectedTab: AnimalTab,
    cartItems: ItemData[],
    pointDifference: number,
    confirmModalToggle: () => void,
}
export default function ConfirmChange({ selectedTab, cartItems, pointDifference, confirmModalToggle }: Props) {
    const [applyModal, setApplyModal] = useState(false);
    const router = useRouter();

    //장바구니 아이템 구매
    const purchaseCartItemsHandler = () => {
        const patchCartData = async () => {
            try {
                const response = await checkoutAnimalCartItems(selectedTab, cartItems);
                console.log('Purchase response:', response.message);
                setApplyModal(true);
            } catch (error) {
                console.error('Error purchasing items:', error);
            }
        };
        patchCartData();
    }


    //구매아이템 프로필에 적용
    const updateProfileHandler = () => {
        const applyProfileItems = async () => {
            // 선택된 아이템의 ID만 추출하여 이중 배열로 만듦
            const itemIds = [cartItems.map(item => item.id)]; // 이중 배열로 만들기 위해 추가적으로 배열로 감쌈

            try {
                const response = await updateProfileItems(selectedTab, itemIds);
                console.log('프로필 업데이트 응답:', response.message);
                window.location.reload();
            } catch (error) {
                console.error('프로필 아이템 업데이트 중 오류 발생:', error);
            }
        };

        applyProfileItems();
        confirmModalToggle();
    };



    console.log('잔돈: ' + pointDifference)
    // 조건1: 상품이 담겨있고, 보유포인트 >= 상품가격 : 구매 최종 확인 모달
    // 조건2: 보유포인트-상품가격 < 0 일때 : 포인트 부족 안내 모달
    // 조건3: 상품이 담겨있지 않을 때 : 상품을 담아주세요 모달

    if (cartItems.length > 0) {
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
                                        onClick={confirmModalToggle}>
                                        취소
                                    </button>
                                    <button
                                        className={style.yesButton}
                                        onClick={purchaseCartItemsHandler}
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
                                        onClick={confirmModalToggle}>
                                        프로필 유지하기
                                    </button>
                                    <button
                                        className={style.yesButton}
                                        onClick={updateProfileHandler}
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
                            <button onClick={confirmModalToggle} className={style.closeButton}>닫기</button>
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
                        <button onClick={confirmModalToggle} className={style.closeButton}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }


}

