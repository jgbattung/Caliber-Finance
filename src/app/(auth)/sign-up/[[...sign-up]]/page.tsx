"use client"

import React, { useState } from 'react'
import Logo from '@/public/assets/logo.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconBrandFacebookFilled, IconBrandGoogleFilled, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { signUpPageTestIds } from '@/utils/constants'
import EmailSignup from '@/components/EmailSignup/EmailSignup'

const SignUp = () => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

  const handleSignUp = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  }

  const handleEmailClick = () => {
    setIsEmailFormOpen(!isEmailFormOpen);
    setIsEmailSent(false);
    setEmail('');
  }

  const handleEmailSubmit = async (email: string) => {
    setEmail(email);
    setIsEmailSent(true);
    setIsEmailFormOpen(!isEmailFormOpen);
  }

  return (
    <div
      className='flex flex-col items-center w-full max-w-md px-1 mx-auto xl:flex-row xl:max-w-full'
    >
      <div
        className='flex items-center justify-center w-full h-dvh max-xl:hidden xl:block basis-1/2 xl:bg-white'
      >
        <p>CALIBER</p>
      </div>
      <div
        data-testid={signUpPageTestIds.signUpContainer}
        className='flex flex-col items-center w-full max-w-md px-1 mx-auto xl:max-w-screen-md xl:px-40 basis-1/2'
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
        <div className='w-full'>
            <Button
              data-testid={signUpPageTestIds.facebookButton}
              onClick={() => handleSignUp('facebook')}
              className='relative flex items-center justify-center w-full py-5 transition-all border rounded-md hover:bg-facebook-darker bg-facebook-base'
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
          <div className='w-full'>
            <Button
              data-testid={signUpPageTestIds.googleButton}
              onClick={() => handleSignUp('google')}
              className='relative flex items-center justify-center w-full py-5 transition-all border rounded-md bg-google-base hover:bg-google-darker'
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
          <div className='w-full'>
            <Button
              data-testid={signUpPageTestIds.emailButton}
              onClick={() => handleEmailClick()}
              className='relative flex items-center justify-center w-full py-5 transition-all border rounded-md bg-email-base hover:bg-email-darker'
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
        {isEmailFormOpen && !isEmailSent && (
          <div className='w-full mt-4'>
            <EmailSignup onEmailSubmit={handleEmailSubmit} />
          </div>
        )}
        {isEmailSent && (
          <div className='flex flex-col gap-3 text-center mt-7'>
            <p className='text-accent-2xs text-color-primary'>We have sent a login link to <span className='font-medium underline'>{`${email}`}</span>. Please check your inbox and click the link to continue.</p>
            <button
              onClick={handleEmailClick}
              className='text-accent-2xs text-primary-500 hover:underline'>I want to use a different email.
            </button>
          </div>
        )}
        <div className='flex items-center justify-center mt-10'>
          <p className='text-accent-xs'>Already have an account? <span><Link data-testid={signUpPageTestIds.redirectLink} href='/sign-in' className='text-green hover:underline'>Log in here.</Link></span></p>
        </div>

      </div>
    </div>
  )
}

export default SignUp