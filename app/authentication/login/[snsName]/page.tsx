'use client'

import Redirect from './_components/Redirect'
import { getCookie } from 'cookies-next'

TODO: '링크로 접속하지 못하게 조치'
export default async function page() {
  const randomString = getCookie('randomString') ?? ''
  return (
    <>
      <Redirect randomString={randomString} />
    </>
  )
}
