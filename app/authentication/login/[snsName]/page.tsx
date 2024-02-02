'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
TODO: '링크로 접속하지 못하게 조치'
export default function page() {
  const { snsName } = useParams<{ snsName: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const sendAuthorizationCode = (authorizationCode: string) => {
    fetch(
      `http://ec2-43-201-195-164.ap-northeast-2.compute.amazonaws.com/api/v1/authentication/login/${snsName}authorizationCode=${authorizationCode}?`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (response.ok) {
          router.push('/')
        } else {
          router.push('/register')
        }
      })
      .catch((error) => console.error('네트워크 에러', error))
  }

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      sendAuthorizationCode(code)
    } else {
      console.error('인가코드가 없습니다.')
    }
  }, [])

  return <div>안녕</div>
}
