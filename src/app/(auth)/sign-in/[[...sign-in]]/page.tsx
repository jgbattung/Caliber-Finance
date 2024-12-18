"use client"

import EmailSignup from '@/components/EmailSignup/EmailSignup'
import { Button } from '@/components/ui/button'
import Logo from '@/public/assets/logo.png'
import { signInPageTestIds } from '@/utils/constants'
import { IconBrandFacebookFilled, IconBrandGoogleFilled, IconMail } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SignIn = () => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  }

  const handleEmailClick = () => {
    setIsTransitioning(true);
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
      className='flex flex-col items-center w-full max-w-md px-1 mx-auto transition-all duration-500 ease-in-out xl:flex-row xl:max-w-full'
    >
      <div
        data-testid={signInPageTestIds.signInContainer}
        className='flex flex-col items-center w-full max-w-md px-1 mx-auto transition-all duration-500 ease-in-out xl:max-w-screen-md xl:px-40 basis-1/2'
      >
        <div className='flex flex-col justify-start w-full gap-10'>
          <Image
            data-testid={signInPageTestIds.logo}
            src={Logo}
            alt='logo'
            width={90}
            height={90}
          />
          <div className='flex flex-col w-full gap-3 font-inter'>
            <p className='font-semibold text-body'>Ready to take charge of your finances?</p>
            <p className='text-accent-xs text-color-secondary'>Log in to continue</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full gap-3 mt-10'>
          <div className='w-full'>
            <Button
              data-testid={signInPageTestIds.facebookButton}
              onClick={() => handleSignIn('facebook')}
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
              data-testid={signInPageTestIds.googleButton}
              onClick={() => handleSignIn('google')}
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
              data-testid={signInPageTestIds.emailButton}
              onClick={() => handleEmailClick()}
              className='relative flex items-center justify-center w-full py-5 transition-all border rounded-md bg-email-base hover:bg-email-darker'
            >
              <IconMail
                size={18}
                stroke={1}
                className='absolute left-5 text-dark-100'
              />
              <p className='text-dark-100 text-body-xs font-montserrat'>
                Continue with Email
              </p>
            </Button>
          </div>
        </div>
        <div 
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isEmailFormOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {(isEmailFormOpen || isTransitioning) && !isEmailSent && (
            <div className='w-full mt-4'>
              <EmailSignup onEmailSubmit={handleEmailSubmit} />
            </div>
          )}
        </div>
        <div
          className={`flex flex-col gap-3 text-center mt-7 overflow-hidden transition-all duration-300 ease-in-out ${
            isEmailSent ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {isEmailSent && (
            <div className='flex flex-col gap-3 text-center mt-7'>
              <p className='text-accent-2xs text-color-primary'>We have sent a login link to <span className='font-medium underline'>{`${email}`}</span>. Please check your inbox and click the link to continue.</p>
              <button
                onClick={handleEmailClick}
                className='text-accent-2xs text-primary-500 hover:underline'>I want to use a different email.
              </button>
            </div>
          )}
        </div>
        <div className='flex items-center justify-center mt-10'>
          <p className='text-accent-xs'>{`Don't have an account?`} <span><Link data-testid={signInPageTestIds.redirectLink} href='/sign-up' className='text-green hover:underline'>Register here.</Link></span></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn