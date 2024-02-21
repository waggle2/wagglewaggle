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
  let defaultProfile
  switch (animal) {
    case '개':
      defaultProfile = <DogDefault />
      break
    case '고양이':
      defaultProfile = <CatDefault />
      break
    case '여우':
      defaultProfile = <FoxDefault />
      break
    case '곰':
      defaultProfile = <BearDefault />
      break
    default:
  }
  return <></>
}
