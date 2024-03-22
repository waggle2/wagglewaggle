import Button from '@/app/_components/button/Button'
import style from './styles/emptyItems.module.scss'

type props = { animal?: string | null }

export default function EmptyItems({ animal }: props) {
  //TODO: 버튼 링크 추가
  return (
    <div className={style.container}>
      <div className={style.svgContainer}>
        <img src={`/assets/mypage/${animal}.svg`} alt={`${animal} icon`} />
      </div>
      <div className={style.content}>
        앗! 아직 저를 <br />
        만나지 못했군요!
      </div>
      <div className={style.subContent}>
        와글와글에서 동물들과 <br />더 많이 얘기하고 뱃지를 모아보세요
      </div>
      <div className={style.buttonWrapper}>
        <Button text={'인기글 보러가기'} mainColor={'green'} />
      </div>
    </div>
  )
}
