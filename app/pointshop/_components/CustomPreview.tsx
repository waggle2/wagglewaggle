import style from '../_styles/customPreview.module.scss'
import PointIcon from './PointIcon';
// import CheckIcon from '@/public/assets/ico_check_green.svg'
import { useRecoilValue } from 'recoil'
import { selectedTabState } from '@/app/_recoil/atoms/pointshopState'

type CustomPreviewProps = {
    selectedEmoji: string;
    selectedProfileBg: string;
    selectedFrame: string;
    selectedWallpaper: string;
    possessionCoin: number;
    confirmModalToggle: () => void;
    handleResetClick: () => void;
};

export default function CustomPreview({
    selectedEmoji,
    selectedProfileBg,
    selectedFrame,
    selectedWallpaper,
    possessionCoin,
    confirmModalToggle,
    handleResetClick,
}: CustomPreviewProps) {
    const selectedTab = useRecoilValue(selectedTabState)

    return (
        <>
            {/* 선택된 동물 꾸미기 미리보기 */}
            <div className={style.customContainer}>
                {selectedTab && (
                    <>
                        <div className={style.customBackground} >
                            {/* <div className={style.customFnc}>
                                <button onClick={handleRefreshClick} className={style.refreshBtn}><RefreshIcon /></button>
                                <button onClick={confirmModalToggle}>
                                    <CheckIcon /></button>
                            </div> */}
                            <div className={style.possessionCoinWrap}>
                                <div className={style.possessionCoin}>
                                    보유 코인
                                    <PointIcon animal={selectedTab} />
                                    {possessionCoin.toLocaleString()}
                                </div>
                            </div>
                            <div className={style.profilePreview}>
                                <div className={style.imageContainer}>
                                    <img className={style.frame} src={selectedFrame} alt={selectedFrame} />
                                    <div className={style.imageBox}>
                                        <img
                                            className={`${style.emoji} ${selectedTab === '고냥이' ? style.cat :
                                                selectedTab === '곰돌이' ? style.bear :
                                                    selectedTab === '댕댕이' ? style.dog :
                                                        selectedTab === '폭스' ? style.fox :
                                                            ''}`}
                                            src={selectedEmoji}
                                            alt={`${selectedEmoji}`}
                                        />                                        {/* <img className={style.animalBody} src={`/assets/point_shop/animal_body/${selectedTab}_body.svg`} /> */}
                                        <img className={style.profileBg} src={selectedProfileBg} alt={selectedProfileBg} />
                                    </div>
                                </div>
                                <img className={style.wallPaper} src={selectedWallpaper} alt={selectedWallpaper} />
                            </div>

                        </div>
                    </>
                )}
            </div>
        </>
    )
}

