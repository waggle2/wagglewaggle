interface IInputValues {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
}
export interface IErrors {
  email?: string
  emailCheck?: string
  password?: string
  passwordCheck?: string
  nickname?: string
}

export const validate = (inputValues: IInputValues): IErrors => {
  const errors: IErrors = {}
  if (inputValues.email && inputValues.email.length < 6) {
    errors.email = '이메일 길이를 6자 이상 적어주세요.'
  }
  if (inputValues.password && inputValues.password.length < 6) {
    errors.password = '비밀번호 길이를 6자 이상 적어주세요.'
  }
  if (
    inputValues.password &&
    inputValues.passwordCheck &&
    inputValues.password !== inputValues.passwordCheck
  ) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.'
  }
  if (inputValues.emailCheck && inputValues.emailCheck !== '1234') {
    errors.emailCheck = '인증번호가 일치하지 않습니다.'
  }
  if (
    inputValues.nickname &&
    (inputValues.nickname.length < 2 || inputValues.nickname.length > 10)
  ) {
    errors.nickname = '닉네임 길이를 2자 이상 10자 이하로 적어주세요.'
  }
  return errors
}
