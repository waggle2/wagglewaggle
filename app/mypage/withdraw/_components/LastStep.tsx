import style from '../withdraw.module.scss'

import ViewPassword from '@/public/assets/viewPassword.svg'

type props = {
  password: string
  setPassword: React.Dispatch<string>
  viewPassword: boolean
  handleViewPassword: React.Dispatch<boolean>
  viewWithDrawModal: () => void
}

export default function LastStep({
  password,
  setPassword,
  viewPassword,
  handleViewPassword,
  viewWithDrawModal,
}: props) {
  return (
    <div className={style.container}>
      <div className={style.title}>함께한 동물 사라지는 중..</div>
      <div className={style.wrapper}>
        <div className={style.inputWrapper}>
          <label className={style.label} htmlFor="password">
            계정 비밀번호
          </label>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              type={viewPassword ? 'password' : 'text'}
              required
              id="password"
              placeholder="비밀번호를 적어주세요"
            />
            <ViewPassword onClick={handleViewPassword} className={style.view} />
          </div>
          <div className={style.notice}>탈퇴 시 유의사항</div>
        </div>
        <button
          className={style.button}
          type="button"
          onClick={viewWithDrawModal}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
