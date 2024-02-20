import api from '@/app/_api/commonApi'
import {
  SignUpResponse,
  SignUpData,
  IErrorResponse,
  IEmailCheck,
  IEmailConfirmResponse,
} from '@/app/_types/userFormTypes'
import { useMutation } from '@tanstack/react-query'

const signUpUser = async (userData: SignUpData): Promise<SignUpResponse> => {
  try {
    const data = await api.post('/authentication', userData)
    return data
  } catch (error) {
    throw error
  }
}

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (userData: SignUpData) => signUpUser(userData),
    onSuccess: (data) => {
      console.log(data)
      alert('회원가입이 완료되었습니다.')
    },
  })
}

const sendCheckEmailCode = async (email: string) => {
  const data = await api.post('/users/email-verification', { email })
  return data
}

export const useSendCheckEmailCode = () => {
  return useMutation<unknown, IErrorResponse, string>({
    mutationFn: (email: string) => sendCheckEmailCode(email),
    onSuccess: () => {
      alert('인증코드가 발송되었습니다.')
    },
  })
}

const confirmEmailCode = async (email: string, emailCheckNumber: string) => {
  const data = await api.post('/users/email-verification/confirm', {
    email,
    verificationCode: Number(emailCheckNumber ?? '') ?? 0,
  })
  return data
}

export const useConfirmEmailCode = () => {
  return useMutation<IEmailConfirmResponse, IErrorResponse, IEmailCheck>({
    mutationFn: ({ email, emailCheckNumber }) =>
      confirmEmailCode(email, emailCheckNumber),
  })
}
