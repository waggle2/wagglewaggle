'use client'

import style from './nickNameModify.module.scss'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/app/_api/commonApi'

import Button from '@/app/_components/button/Button'
import InputText from '../_components/InputText'
import Modal from '@/app/_components/common/modal/Modal'

export default function NickNameModify() {
  const router = useRouter()
  const [nickName, setNickName] = useState('')
  const [activeButton, setActiveButton] = useState(false)
  const [warning, setWarning] = useState('')
  const [modalView, setModalView] = useState(false)

  const regex = /^(?!.*[\sㄱ-ㅎㅏ-ㅣ])[가-힣a-zA-Z0-9]{1,12}$/
  const specialRegex = /[!@#$%^&*(),.?":{}|<>]/

  const handleSetNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(() => e.target.value)

    if (specialRegex.test(e.target.value)) {
      setWarning(() => '닉네임은 한글, 영어, 숫자를 조합하여 입력해주세요.')
      setActiveButton(() => false)
    }
    if (e.target.value.length > 12) {
      setWarning(() => '최대 글자수를 초과했습니다. 다시 입력해주세요.')
      setActiveButton(() => false)
    }
  }

  const handlePatchNickName = async () => {
    if (regex.test(nickName)) {
      try {
        const data = await api.patch('/users/nickname', { nickName })
        console.log(data)
        setModalView(true)
      } catch (e) {
        console.error(e, 'patchNickName error')
        setWarning(() => '중복된? 닉네임입니다. 다시 확인해주세요.')
        setActiveButton(() => false)
      }
    } else {
      setWarning(() => '사용할 수 없는 닉네임입니다. 다시 확인해주세요.')
      setActiveButton(() => false)
    }
  }
  return (
    <div className={style.container}>
      <InputText
        placeholder={'변경할 닉네임을 적어주세요'}
        warning={warning}
        onChange={handleSetNickName}
        text={nickName}
      />

      <div className={style.notification}>
        · 공백없이 최대 한글 6글자, 영문 12자까지 입력 가능합니다.
        <br />· 변경 후 24시간 뒤 재변경이 가능합니다.
      </div>
      {activeButton ? (
        <Button
          text={'변경하기'}
          mainColor={'green'}
          action={handlePatchNickName}
        />
      ) : (
        <Button text={'변경하기'} mainColor={'grey'} />
      )}
      {modalView && (
        <Modal
          title={'변경 완료'}
          content={'닉네임이 변경되었습니다.'}
          buttons={[
            <Button
              text={'확인'}
              mainColor={'green'}
              key={'success'}
              action={() => {
                router.replace('/mypage')
              }}
            />,
          ]}
        />
      )}
    </div>
  )
}
