"use client"

import React from 'react'
import Logo from '@/public/assets/logo.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconBrandFacebookFilled, IconBrandGoogleFilled, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { signUpPageTestIds } from '@/utils/constants'

const SignUp = () => {
  const handleSignUp = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  }

  return (
    <div
      data-testid={signUpPageTestIds.signUpContainer}
      className='flex flex-col items-center w-full'
    >
      <div className='flex flex-col justify-start w-full gap-10'>
        <Image 
          data-testid={signUpPageTestIds.logo}
          src={Logo}
          alt='logo'
          width={90}
          height={90}
        />
        <div className='flex flex-col w-full gap-3 font-inter'>
          <p className='font-semibold text-body'>Welcome to Caliber: Your path to financial precision.</p>
          <p className='text-accent-xs text-color-secondary'>Please sign up to get started</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-3 mt-10'>
        <div>
          <Button
            data-testid={signUpPageTestIds.facebookButton}
            onClick={() => handleSignUp('facebook')}
            className='relative flex items-center justify-center py-5 transition-all border rounded-md w-72 hover:bg-facebook-darker bg-facebook-base'
          >
            <IconBrandFacebookFilled 
              size={18}
              color='white'
              stroke={1}
              className='absolute left-5'
            />
            <p className='text-light-100 text-body-xs font-montserrat'>
              Continue with Facebook
            </p>
          </Button>
        </div>
        <div>
          <Button
            data-testid={signUpPageTestIds.googleButton}
            onClick={() => handleSignUp('google')}
            className='relative flex items-center justify-center py-5 transition-all border rounded-md bg-google-base w-72 hover:bg-google-darker'
          >
            <IconBrandGoogleFilled 
              size={18}
              color='white'
              stroke={1}
              className='absolute left-5'
            />
            <p className='text-light-100 text-body-xs font-montserrat'>
              Continue with Google
            </p>
          </Button>
        </div>
        <div>
          <Button
            data-testid={signUpPageTestIds.emailButton}
            className='relative flex items-center justify-center py-5 transition-all border rounded-md bg-email-base w-72 hover:bg-email-darker'
          >
            <IconMail
              size={18}
              stroke={2}
              className='absolute left-5 text-dark-100'
            />
            <p className='text-dark-100 text-body-xs font-montserrat'>
              Continue with Email
            </p>
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-center w-full gap-3 my-4'>
        <div className='w-5/12 border-b border-b-dark-200' />
        <p className='font-light text-accent-2xs dark:text-color-secondary'>or</p>
        <div className='w-5/12 border-b border-b-dark-200' />
      </div>
      <div>
        FORM
      </div>
      <div className='flex items-center justify-center mt-5'>
        <p className='text-accent-xs'>Already have an account? <span><Link href='/sign-in' className='text-green hover:underline'>Log in here.</Link></span></p>
      </div>
    </div>
  )
}

export default SignUp