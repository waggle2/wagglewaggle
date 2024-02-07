import style from './styles/myType.module.scss'
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
    <>
      <article className={style.container}>
        <div className={style.point}>획득한 포인트</div>
        <div className={style.animalWrapper}>
          <Type svg={<Cat />} title={'고냥이'} count={cat} active={true} />
          <Type svg={<Bear />} title={'곰돌이'} count={bear} active={true} />
          <Type svg={<Dog />} title={'댕댕이'} count={dog} />
          <Type svg={<Fox />} title={'폭스'} count={fox} />
        </div>
      </article>
      <article className={style.typeWrapper}>
        다른 친구들이 바라보는 {'열정냥냥이'}님은 ..
        <br />
        <p className={style.type}>{type}</p>같아요
      </article>
    </>
  )
}
