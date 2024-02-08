import style from '../withdraw.module.scss'

import WithDraw from '@/public/assets/withDraw.svg'

type props = {
  handleNextStep: () => void
}

export default function FirstStep({ handleNextStep }: props) {
  return (
    <div className={style.container}>
      <div className={style.title}>
        정말로
        <br /> 와글와글을 떠나실건가요?
      </div>
      <div className={style.subTitle}>
        지금 계정을 지우면
        <br />
        다시는 동물친구들을 만나지 못해요
      </div>
      <div className={style.wrapper}>
        <WithDraw />
        <button className={style.button} type="button" onClick={handleNextStep}>
          계속하기
        </button>
      </div>
    </div>
  )
}
