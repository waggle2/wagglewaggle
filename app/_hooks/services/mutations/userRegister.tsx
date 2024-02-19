import api from '@/app/_api/commonApi'
import { SignUpResponse, SignUpData } from '@/app/_types/userFormTypes'
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
  return useMutation({
    mutationFn: (userData: SignUpData) => signUpUser(userData),
    onSuccess: (data) => {
      console.log(data)
      alert('회원가입이 완료되었습니다.')
      router.replace('/')
    },
    onError: (error) => {
      console.error(error)
      alert('회원가입에 실패했습니다.')
    },
  })
}
