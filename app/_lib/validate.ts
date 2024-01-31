interface IInputValues {
  email: string
  password: string
  passwordCheck: string
  emailCheck: number | null
}
export interface IErrors {
  email?: string
  password?: string
  passwordCheck?: string
  emailCheck?: string
}

export const validate = (inputValues: IInputValues): IErrors => {
  const errors: IErrors = {}
  if (inputValues.email.length < 6) {
    errors.email = '이메일 길이를 6자 이상 적어주세요.'
  }
  if (inputValues.password.length < 6) {
    errors.password = '비밀번호 길이를 6자 이상 적어주세요.'
  }
  if (inputValues.password !== inputValues.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.'
  }
  if (inputValues.emailCheck === null || inputValues.emailCheck !== 1234) {
    errors.emailCheck = '인증번호가 일치하지 않습니다.'
  }
  return errors
}
