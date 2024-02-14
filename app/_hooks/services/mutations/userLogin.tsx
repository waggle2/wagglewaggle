import api from '@/app/_api/commonApi'
import { ILogin } from '@/app/_types/userFormTypes'
import { useMutation } from '@tanstack/react-query'

const loginUser = async (loginData: ILogin): Promise<any> => {
  const data = await api.post('/authentication/login', loginData)
  return data
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (loginData: ILogin) => loginUser(loginData),
  })
}
