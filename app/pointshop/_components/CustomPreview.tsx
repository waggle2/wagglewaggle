import style from '../_styles/pointShop.module.scss'
import PointIcon from './PointIcon';
import RefreshIcon from '@/public/assets/ico_refresh.svg'
import CheckIcon from '@/public/assets/ico_check_green.svg'

type CustomPreviewProps = {
    selectedTab: string;
    selectedEmoji: string;
    selectedProfileBg: string;
    selectedFrame: string;
    selectedWallpaper: string;
    possessionCoin: number;
    confirmModalToggle: () => void;
    handleResetClick: () => void;
};

export default function CustomPreview({
    selectedTab,
    selectedEmoji,
    selectedProfileBg,
    selectedFrame,
    selectedWallpaper,
    possessionCoin,
    confirmModalToggle,
    handleResetClick,
}: CustomPreviewProps) {

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

                            <div className={style.profilePreview}>
                                <img className={style.emoji} src={selectedEmoji} alt={`${selectedEmoji}`} />
                                <img className={style.frame} src={selectedFrame} alt={selectedFrame} />
                                <img className={style.animalBody} src={`/assets/point_shop/animal_body/${selectedTab}_body.svg`} />
                                <img className={style.profileBg} src={selectedProfileBg} alt={selectedProfileBg} />
                                <img className={style.wallPaper} src={selectedWallpaper} alt={selectedWallpaper} />
                            </div>
                            <div className={style.possessionCoinWrap}>
                                <div className={style.possessionCoin}>
                                    MY COIN
                                    <PointIcon animal={selectedTab} />
                                    {possessionCoin.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

