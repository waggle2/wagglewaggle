'use client'
import {
  useSendAuthorizationCode,
  useSendAuthorizationCodeNaver,
} from '@/app/_hooks/services/mutations/userLogin'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import style from '../styles/page.module.scss'
import { ISocialLoginResponse } from '@/app/_types/userFormTypes'
import { hasCookie } from 'cookies-next'

export default function Redirect({ randomString }: { randomString: string }) {
  const { snsName } = useParams<{ snsName: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const authorizationCode = searchParams.get('code')
  const state = searchParams.get('state') ?? ''
  const mutation = useSendAuthorizationCode()
  const mutationNaver = useSendAuthorizationCodeNaver()

  useEffect(() => {
    if (snsName === 'naver' && state !== randomString) {
      alert('로그인이 실패하였습니다.')
      router.replace('/login')
      return
    }
    if (snsName === 'naver' && !hasCookie('randomString')) {
      alert('로그인이 실패하였습니다.')
      router.replace('/login')
      return
    }
  }, [])

  const socialLoginMutation = () => {
    if (!authorizationCode) {
      alert('인증이 실패하였습니다.')
      router.replace('/login')
      return
    }
    mutation.mutate(
      { authorizationCode, snsName },
      {
        onSuccess: (response) => {
          const typeData = response as ISocialLoginResponse
          if (typeData.code === 200) {
            console.log(typeData.message)
            localStorage.setItem('isLogin', 'true')
            router.replace('/')
          }
          if (typeData.code === 302) {
            console.log(typeData.message)
            router.replace(
              `/register/email?social=${snsName}&socialId=${typeData.data.socialId}`,
            )
          }
        },
        onError: () => {
          alert('인증이 실패하였습니다.')
          router.replace('/login')
        },
      },
    )
  }

  const socialLoginMutationNaver = () => {
    if (!authorizationCode) {
      alert('인증이 실패하였습니다.')
      router.replace('/login')
      return
    }
    mutationNaver.mutate(
      { authorizationCode, state, snsName },
      {
        onSuccess: (response) => {
          const typeData = response as ISocialLoginResponse
          if (typeData.code === 200) {
            console.log(typeData)
            localStorage.setItem('isLogin', 'true')
            router.replace('/')
          }
          if (typeData.code === 302) {
            console.log(typeData)
            router.replace(
              `/register/email?social=${snsName}&socialId=${typeData.data.socialId}`,
            )
          }
        },
        onError: () => {
          alert('인증이 실패하였습니다.')
          router.replace('/login')
        },
      },
    )
  }

  useEffect(() => {
    socialLoginMutationNaver()
  }, [])
  return <div className={style.container}>{snsName} 인증 중입니다...</div>
}
