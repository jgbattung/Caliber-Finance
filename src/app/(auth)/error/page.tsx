"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import Logo from '@/public/assets/logo.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

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
          {error == "Verification"
            ? 'The sign in link is no longer valid. It may have been used already or it may have expired.'
            : 'An error occured during authentication'
          }
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

export default AuthError