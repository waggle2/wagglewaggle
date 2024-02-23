import FoxDefault from '@/public/assets/fox_default.svg'
import BearDefault from '@/public/assets/bear_default.svg'
import DogDefault from '@/public/assets/dog_default.svg'
import CatDefault from '@/public/assets/cat_default.svg'

type props = {
  isAnonymous: boolean
  image?: any[]
  animal: string
}

export default function Profile({ isAnonymous, image, animal }: props) {
  if (isAnonymous && image?.length === 0) {
    switch (animal) {
      case '개':
        return <DogDefault />

      case '고양이':
        return <CatDefault />

      case '여우':
        return <FoxDefault />

      case '곰':
        return <BearDefault />

      default:
    }
  } else {
    return <BearDefault /> //TODO: 유저 프로필 정보 받아와서 뿌려주는 로직 생성
  }
  return <></>
}
