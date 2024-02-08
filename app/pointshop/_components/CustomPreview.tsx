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
    handleConfirmModalClick: () => void;
    handleRefreshClick: () => void;
};

export default function CustomPreview({
    selectedTab,
    selectedEmoji,
    selectedProfileBg,
    selectedFrame,
    selectedWallpaper,
    possessionCoin,
    handleConfirmModalClick,
    handleRefreshClick,
}: CustomPreviewProps) {
    return (
        <>
            {/* 선택된 동물 꾸미기 미리보기 */}
            <div className={style.customContainer}>
                {selectedTab && (
                    <>
                        <div className={style.customBackground} >
                            <div className={style.customFnc}>
                                <button onClick={handleRefreshClick} className={style.refreshBtn}><RefreshIcon /></button>
                                <button onClick={handleConfirmModalClick}>
                                    <CheckIcon /></button>
                            </div>

                            <div className={style.profileResult}>
                                <img className={style.emoji} src={selectedEmoji} alt={`${selectedEmoji}`} />
                                <img className={style.frame} src={selectedFrame} alt={selectedFrame} />
                                <img className={style.profileBg} src={selectedProfileBg} alt={selectedProfileBg} />
                                <img className={style.wallPaper} src={selectedWallpaper} alt={selectedWallpaper} />
                            </div>

                            <div className={style.possessionCoin}>
                                <PointIcon />
                                {possessionCoin}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

