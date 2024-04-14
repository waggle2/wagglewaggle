import style from './styles/itemSelection.module.scss'

type props = {
  animal?: string | null
  src: string
}
export default function BackgroundPrev({ animal, src }: props) {
  return (
    <div className={style.backgroundWrapper}>
      <img
        className={style.EmojiPrev}
        src={`/assets/point_shop/emoji/${animal}_default.svg`}
        alt={'animal emoji'}
      />
      <img
        className={style.backgroundPrev}
        src={src}
        alt={'background color'}
      />
    </div>
  )
}
