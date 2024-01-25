import style from './profileSetting.module.scss'

export default function EmptyPreview() {
  return (
    <div className={style.customContainer}>
      <div className={style.customBackground}>
        <div className={style.customFnc}>
          <button>
            <img src="/point_shop/ico_check_green.svg" alt="" />
          </button>
          <button className={style.refreshBtn}>
            <img src="/point_shop/ico_refresh.svg" alt="" />
          </button>
        </div>
        <div className={style.profileResult}>
          {/* <img
              className={style.emoji}
              src={'/assets/emptyEmoji.svg'}
              alt={'empty Emoji'}
            />
            <img
              className={style.frame}
              src={'/assets/emptyFrame.svg'}
              alt={'empty Frame'}
            /> */}
          <img
            className={style.profileBg}
            src={'/assets/emptyProfile.svg'}
            alt={'empty ProfileBg'}
          />
          <img
            className={style.wallPaper}
            src={'/assets/emptyWallPaper.png'}
            alt={'empty wallPaper'}
          />
        </div>
      </div>
      <div className={style.emptyItemWrapper}>
        <div className={style.title}>
          앗! 아직 저를
          <br />
          만나지 못했군요!
        </div>
        <div className={style.content}>
          와글와글에서 동물들과
          <br />
          더많이 얘기하고 뱃지를 모아보세요
        </div>
      </div>
    </div>
  )
}
