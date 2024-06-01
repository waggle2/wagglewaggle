'use client'
import { useEffect, useState } from 'react'
import styles from '../styles/empathyButton.module.scss'
import AnimalEmpathy from './AnimalEmpathy'
import Empathy from '/public/assets/empathy.svg'
import CatEmoji from '/public/assets/catEmoji.svg'
import BearEmoji from '/public/assets/bearEmoji.svg'
import DogEmoji from '/public/assets/dogEmoji.svg'
import FoxEmoji from '/public/assets/foxEmoji.svg'
import {
  useAddStikers,
  useDeleteStikers,
  useModifyStikers,
} from '@/app/_hooks/services/mutations/stickers'
import { useQueryClient } from '@tanstack/react-query'

interface EmpathyButtonProps {
  commentId: number
  stickers: {
    userId: string
    id: number
    animal: string
  }[]
  userId: string
}
export default function EmpathyButton({
  commentId,
  stickers,
  userId,
}: EmpathyButtonProps) {
  const [isClick, setIsClick] = useState(false)
  const [animal, setAnimal] = useState('')
  const [stickerId, setStickerId] = useState(0)
  const [isEmpathy, setIsEmpathy] = useState(false)
  const { mutate: addStikers } = useAddStikers(commentId)
  const { mutate: modifyStickers } = useModifyStikers()
  const { mutate: deleteStickers } = useDeleteStikers()
  const isLogin =
    typeof window !== 'undefined' && window.localStorage.getItem('isLogin')
  const queryClient = useQueryClient()

  const handleEmpathy = (type: string) => {
    if (type === animal) {
      deleteStickers(stickerId)
      setAnimal('')
      setIsEmpathy(false)
    } else {
      setAnimal(type)
      if (isLogin !== 'true') {
        alert('로그인 이후 사용 가능합니다.')
        return
      }
      if (isEmpathy) {
        modifyStickers({ id: stickerId, animal: type })
      } else {
        addStikers(type, {
          onSuccess: (response) => {
            setStickerId(response.data.id)
            setIsEmpathy(true)
            queryClient.invalidateQueries({ queryKey: ['get-comments'] })
            alert(response.message)
          },
          onError: (response) => {
            alert(response.message)
          },
        })
      }
    }
    setIsClick(false)
  }
  useEffect(() => {
    stickers.forEach((item) => {
      if (item.userId.includes(userId)) {
        setIsEmpathy(true)
        setStickerId(item.id)
        setAnimal(item.animal)
      }
    })
  }, [])
  return (
    <>
      {isClick && (
        <div className={styles.selectAnimal}>
          <CatEmoji
            width="32"
            height="32"
            onClick={() => handleEmpathy('고냥이')}
          />
          <BearEmoji
            width="32"
            height="32"
            onClick={() => handleEmpathy('곰돌이')}
          />
          <DogEmoji
            width="32"
            height="32"
            onClick={() => handleEmpathy('댕댕이')}
          />
          <FoxEmoji
            width="32"
            height="32"
            onClick={() => handleEmpathy('폭스')}
          />
        </div>
      )}

      <div
        className={styles.buttonSection}
        onClick={() => setIsClick(!isClick)}
      >
        <div className={styles.empathyButton}>
          <Empathy />
          <span>공감하기</span>
        </div>
        <AnimalEmpathy stickers={stickers} />
      </div>
    </>
  )
}
