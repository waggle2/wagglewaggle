import style from './styles/myType.module.scss'
import Type from './Type'
import Cat from '/public/assets/cat.svg'
import Bear from '/public/assets/bear.svg'
import Dog from '/public/assets/dog.svg'
import Fox from '/public/assets/fox.svg'

type props = {
  nickName?: string
  primaryAnimal?: string
  cat?: number
  bear?: number
  dog?: number
  fox?: number
}

export default function MyType({
  nickName,
  primaryAnimal,
  cat,
  bear,
  dog,
  fox,
}: props) {
  return (
    <>
      <article className={style.container}>
        <div className={style.point}>획득한 포인트</div>
        <div className={style.animalWrapper}>
          <Type
            svg={<Cat />}
            title={'고냥이'}
            count={cat}
            active={primaryAnimal === '고냥이'}
          />
          <Type
            svg={<Bear />}
            title={'곰돌이'}
            count={bear}
            active={primaryAnimal === '곰돌이'}
          />
          <Type
            svg={<Dog />}
            title={'댕댕이'}
            count={dog}
            active={primaryAnimal === '댕댕이'}
          />
          <Type
            svg={<Fox />}
            title={'폭스'}
            count={fox}
            active={primaryAnimal === '폭스'}
          />
        </div>
      </article>
      <article className={style.typeWrapper}>
        다른 친구들이 바라보는 {nickName}님은 ..
        <br />
        <span className={style.type}>{primaryAnimal}</span>같아요
      </article>
    </>
  )
}
