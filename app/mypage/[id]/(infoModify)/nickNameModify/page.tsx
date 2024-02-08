'use client'

import style from './nickNameModify.module.scss'

import Button from '@/app/_components/button/Button'
import InputText from '../_components/InputText'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/app/_components/common/modal/Modal'

export default function NickNameModify() {
  const router = useRouter()
  const [nickName, setNickName] = useState('')
  const [warning, setWarning] = useState('')
  const [modalView, setModalView] = useState(false)
  const regex = /^[가-힣]{0,6}|[a-zA-Z]{0,12}$/

  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(() => e.target.value)
    regex.test(e.target.value) && setWarning(() => '')
    if (e.target.value.length > 12) {
      setWarning(() => '최대 글자수를 초과했습니다. 다시 입력해주세요.')
    }
  }
  return (
    <div className={style.container}>
      <InputText
        placeholder={'변경할 닉네임을 적어주세요'}
        warning={warning}
        onChange={handleChangeNickName}
        text={nickName}
      />

      <div className={style.notification}>
        · 공백없이 최대 한글 6글자, 영문 12자까지 입력 가능합니다.
        <br />· 변경 후 24시간 뒤 재변경이 가능합니다.
      </div>
      {!!warning ? (
        <Button text={'변경하기'} mainColor={'grey'} />
      ) : (
        <Button
          text={'변경하기'}
          mainColor={'green'}
          action={() => {
            setModalView(true)
          }}
        />
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
                setModalView(false)
                router.replace('/mypage')
              }}
            />,
          ]}
        />
      )}
    </div>
  )
}
