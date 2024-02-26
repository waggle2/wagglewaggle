'use client'
import api from '@/app/_api/commonApi'
import { ILogin } from '@/app/_types/userFormTypes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const loginUser = async (loginData: ILogin): Promise<any> => {
  const data = await api.post('/authentication/login', loginData)
  return data
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (loginData: ILogin) => loginUser(loginData),
  })
}

const sendAuthorizationCode = async (
  authorizationCode: string,
  snsName: string,
): Promise<any> => {
  const data = await api.post(`/authentication/login/${snsName}`, {
    authorizationCode,
  })
  return data
}

export const useSendAuthorizationCode = () => {
  return useMutation<
    unknown,
    Error,
    { authorizationCode: string; snsName: string }
  >({
    mutationFn: ({ authorizationCode, snsName }) =>
      sendAuthorizationCode(authorizationCode, snsName),
  })
}
