'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CustomSignInError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      router.push(`/error?error=${error}`)
    } else {
      router.push('/sign-in')
    }
  }, [error, router])

  return <div>Redirecting...</div>
}