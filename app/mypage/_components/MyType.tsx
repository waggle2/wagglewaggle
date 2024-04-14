import style from './styles/myType.module.scss'
import Type from './Type'
import Cat from '@/public/assets/mypage/고냥이.svg'
import Bear from '@/public/assets/mypage/곰돌이.svg'
import Dog from '@/public/assets/mypage/댕댕이.svg'
import Fox from '@/public/assets/mypage/폭스.svg'

type props = {
  nickName?: string
  primaryAnimal?: string
  secondAnimal?: string
  cat?: number
  bear?: number
  dog?: number
  fox?: number
}

export default function MyType({
  nickName,
  primaryAnimal,
  secondAnimal,
  cat = 0,
  bear = 0,
  dog = 0,
  fox = 0,
}: props) {
  const findMax = (number: number, type: string) => {
    if (number === Math.max(cat, bear, dog, fox)) {
      if (primaryAnimal === type || secondAnimal === type) {
        return type
      }
    }
  }

  return (
    <>
      <article className={style.container}>
        <div className={style.point}>받은 동물 스티커</div>
        <div className={style.animalWrapper}>
          <Type
            svg={<Cat />}
            title={'고냥이'}
            count={cat}
            active={findMax(cat, '고냥이')}
          />
          <Type
            svg={<Bear />}
            title={'곰돌이'}
            count={bear}
            active={findMax(bear, '곰돌이')}
          />
          <Type
            svg={<Dog />}
            title={'댕댕이'}
            count={dog}
            active={findMax(dog, '댕댕이')}
          />
          <Type
            svg={<Fox />}
            title={'폭스'}
            count={fox}
            active={findMax(fox, '폭스')}
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
