import api from '@/app/_api/commonApi'
import { SignUpResponse, SignUpData } from '@/app/_types/userFormTypes'
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
