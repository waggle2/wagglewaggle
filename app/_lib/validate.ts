import { IErrors, IInputFileds } from '@/app/_types/userFormTypes'

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
    errors.password = '8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.'
  }

  if (
    inputValues.password &&
    inputValues.passwordCheck &&
    inputValues.password !== inputValues.passwordCheck
  ) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.'
  }

  if (inputValues.nickname && !validateNickname(inputValues.nickname)) {
    errors.nickname = '특수문자 제외, 4~12자로 입력해주세요.'
  }
  if (inputValues.birthYear && !validateBirthYear(inputValues.birthYear)) {
    errors.birthYear = '출생년도는 숫자 4자리로 입력해주세요.'
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
  const regex = /^[가-힣a-zA-Z0-9]{4,12}$/
  return regex.test(nickname)
}

function validateBirthYear(birthYear: string) {
  const regex = /^[0-9]{4}$/
  return regex.test(birthYear)
}

export function checkObject(obj: any, subObj: any) {
  let result = 0

  Object.keys(subObj).forEach((key) => {
    if (obj[key] === '' || obj[key] == null) return (result += 1)
  })
  return result === 0 ? true : false
}

export const isPassableNewLineInMessage = (text: string) => {
  const countNewlines = (text: string) => {
    const newlineCount = (text.match(/\n/g) || []).length

    return newlineCount
  }

  if (countNewlines(text) >= 6) {
    return false
  }
  return true
}
