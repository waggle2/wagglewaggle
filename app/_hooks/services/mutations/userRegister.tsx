import api from '@/app/_api/commonApi'
import { IErrorResponse } from '@/app/_types/apiTypes'
import {
  SignUpResponse,
  SignUpData,
  IEmailCheck,
  IEmailConfirmResponse,
  IResetPassword,
} from '@/app/_types/userFormTypes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const signUpUser = async (userData: SignUpData): Promise<SignUpResponse> => {
  try {
    const data = await api.post('/authentication', userData)
    return data
  } catch (error) {
    throw error
  }
}

export const useSignUpUser = () => {
  const router = useRouter()
  const localStorage = window.localStorage
  return useMutation({
    mutationFn: (userData: SignUpData) => signUpUser(userData),
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem('isVerified', 'false')
      alert('회원가입이 완료되었습니다.')
      router.replace('/')
    },
    onError: (error) => {
      console.error(error)
      alert('회원가입에 실패했습니다.')
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

const sendPasswordEmailCode = async (email: string) => {
  const data = await api.post('/users/email-verification/password', { email })
  return data
}

export const useSendPasswordEmailCode = () => {
  return useMutation<unknown, IErrorResponse, string>({
    mutationFn: (email: string) => sendPasswordEmailCode(email),
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

const resetPassword = async (email: string, newPassword: string) => {
  const data = await api.patch('/authentication/password-reset', {
    email,
    newPassword,
  })
  return data
}

export const useResetPassword = () => {
  return useMutation<unknown, IErrorResponse, IResetPassword>({
    mutationFn: ({ email, newPassword }) => resetPassword(email, newPassword),
  })
}
