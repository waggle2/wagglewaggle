import style from './myType.module.scss'
import Type from './Type'
import Cat from '@/public/assets/cat.svg'
import Bear from '@/public/assets/bear.svg'
import Dog from '@/public/assets/dog.svg'
import Fox from '@/public/assets/fox.svg'

type props = {
  type: string
  cat: number
  bear: number
  dog: number
  fox: number
}

export default function MyType({ type, cat, bear, dog, fox }: props) {
  return (
    <article className={style.container}>
      <div className={style.typeWrapper}>
        <div className={style.typeTitle}>현재 나는..?</div>
        <div className={style.type}>{type} 타입</div>
      </div>
      <div className={style.animalWrapper}>
        <Type svg={<Cat />} title={'고냥이'} count={cat} />
        <Type svg={<Bear />} title={'곰돌이'} count={bear} />
        <Type svg={<Dog />} title={'댕댕이'} count={dog} />
        <Type svg={<Fox />} title={'폭스'} count={fox} />
      </div>
    </article>
  )
}
