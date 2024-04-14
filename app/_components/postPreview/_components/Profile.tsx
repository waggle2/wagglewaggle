import style from './post.module.scss'

import { profileItems } from '../_types/responseType'

import PostProfile from './PostProfile'

type props = {
  isAnonymous: boolean
  isWithDraw?: boolean
  image?: profileItems
  animal: string
}

export default function Profile({
  isAnonymous,
  image,
  animal,
  isWithDraw,
}: props) {
  return (
    <div className={style.postProfileContainer}>
      <PostProfile
        isWithDraw={isWithDraw}
        animal={animal}
        selectedEmoji={isAnonymous || !image ? undefined : image[0]?.emoji}
        selectedProfileBg={
          isAnonymous || !image ? undefined : image[0]?.background
        }
        selectedFrame={isAnonymous || !image ? undefined : image[0]?.frame}
      />
    </div>
  )
}
