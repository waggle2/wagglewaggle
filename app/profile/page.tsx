'use client'

import { redirect } from '@/node_modules/next/navigation'
import { useEffect } from 'react'

export default function Profile() {
  useEffect(() => {
    redirect('/')
  }, [])
}
