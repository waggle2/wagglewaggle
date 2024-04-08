import style from './post.module.scss'

import { profileItems } from '../_types/responseType'

import PostProfile from './PostProfile'

type props = {
  isAnonymous: boolean
  image?: profileItems
  animal: string
}

export default function Profile({ isAnonymous, image, animal }: props) {
  return (
    <div className={style.postProfileContainer}>
      <PostProfile
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
