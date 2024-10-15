"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Logo from '@/public/assets/logo.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react'

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Callback':
        return 'The sign-in process was cancelled or interrupted. Please try again.';
      case 'OAuthSignin':
        return 'There was a problem starting the sign-in process. Please try again.';
      case 'OAuthCallback':
        return 'There was a problem during the sign-in process. Please try again.';
      case 'OAuthCreateAccount':
        return 'There was a problem creating your account. Please try again.';
      case 'EmailCreateAccount':
        return 'There was a problem creating your account. Please try again.';
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account. Please sign in with your original method.';
      case 'EmailSignin':
        return 'There was a problem sending the sign-in email. Please try again.';
      case 'CredentialsSignin':
        return 'The sign-in information you provided is incorrect. Please try again.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      case "Verification":
        return 'The sign in link is no longer valid. It may have been used already or it may have expired.';
      default:
        return 'An unexpected error occurred during authentication. Please try again.';
    }
  }

  return (
    <div className='relative flex flex-col items-center justify-center min-h-dvh text-color-primary'>
      <div>
        <Image 
          alt='logo'
          src={Logo}
          width={70}
          height={70}
          className='fixed top-10 left-10'
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-4'>
        <h1 className='font-extrabold font-montserrat text-heading-2xl'>Oops!</h1>
        <p className='text-body-xs'>
          {getErrorMessage(error)}
        </p>
        <div className='mt-5'>
          <Link
            href={'sign-in'}
          >
            <Button
              className='w-full mt-2 text-white transition-all button-dark'
            >
                Back to log in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  )
}