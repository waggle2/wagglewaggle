'use client'
import api from '@/app/_api/commonApi'
import { useSendAuthorizationCode } from '@/app/_hooks/services/mutations/userLogin'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
TODO: '링크로 접속하지 못하게 조치'
export default function page() {
  const { snsName } = useParams<{ snsName: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const mutation = useSendAuthorizationCode()

  useEffect(() => {
    const authorizationCode = searchParams.get('code')

    if (!authorizationCode) {
      alert('인증이 실패하였습니다.')
      router.replace('/login')
      return
    }
    mutation.mutate(
      { authorizationCode, snsName },
      {
        onSuccess: (response) => {
          const typeData = response as { code: number; message: string }
          if (typeData.code === 200) {
            console.log(typeData.message)
            localStorage.setItem('isLogin', 'true')
            router.replace('/')
          }
          if (typeData.code === 302) {
            console.log(typeData.message)
            router.replace('/register/email?step=2')
          }
        },
        onError: () => {
          alert('인증이 실패하였습니다.')
          router.replace('/login')
        },
      },
    )
  }, [])

  return <div>안녕</div>
}
