import { IErrors, IInputFileds } from '../_hooks/useFormInput'

export const validate = (inputValues: IInputFileds): IErrors => {
  const errors: IErrors = {}
  if (
    inputValues.email &&
    (!validateEmailLocalPart(inputValues.email) ||
      !validateEmail(inputValues.email))
  ) {
    errors.email = '이메일의 형태 혹은 길이가 맞지 않습니다.'
  }
  if (inputValues.password && !validatePassword(inputValues.password)) {
    errors.password =
      '비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.'
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
  if (inputValues.nickname && !validateNickname(inputValues.nickname)) {
    errors.nickname =
      '닉네임을 한글, 영어, 숫자를 포함하며 길이를 2자 이상 10자 이하로 적어주세요.'
  }
  return errors
}

function validateEmailLocalPart(email: string) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{4,20}/
  const localPart = email.split('@')[0]
  return regex.test(localPart) && localPart.length <= 20
}

function validateEmail(email: string) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{4,20}@[a-zA-Z0-9-]{2,63}(\.[a-zA-Z]{2,10})+$/
  return regex.test(email)
}

function validatePassword(password: string) {
  const lengthRegex = /^.{8,16}$/
  const letterRegex = /[A-Za-z]/
  const numberRegex = /[0-9]/
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/

  return (
    lengthRegex.test(password) &&
    letterRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  )
}

function validateNickname(nickname: string) {
  const regex = /^[가-힣a-zA-Z0-9]{2,12}$/
  return regex.test(nickname)
}

export function checkObject(obj: any, subObj: any) {
  let result = 0
  Object.keys(subObj).forEach((key) => {
    if (obj[key]?.length === 0) result++
  })
  return result === 0 ? true : false
}
