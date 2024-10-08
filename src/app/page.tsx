import Image from 'next/image'
import React from 'react'
import Logo from '../public/assets/logo.png'
import Link from 'next/link'
import { landingPageTestsIds } from '@/utils/constants'

const Landing = () => {
  return (
    <div
      data-testid={landingPageTestsIds.mainContainer}
      className='flex flex-col items-center justify-around h-dvh'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image
          data-testid={landingPageTestsIds.logo}
          src={Logo}
          alt='Caliber logo'
          width={200}
          height={90}
        />
        <p className='text-body-xs'>
          Precision finance for a powerful future
        </p>
      </div>
      <div className='flex flex-col items-center justify-center gap-3 font-montserrat'>
        <Link
          data-testid={landingPageTestsIds.loginButton}
          href='/sign-in'
          className='flex items-center justify-center py-2 transition-all border rounded-md w-80 hover:bg-primary-600 bg-primary-500 border-primary-500'
        >
          <p className='font-semibold text-light-100'>
            Login
          </p>
        </Link>
        <Link
          data-testid={landingPageTestsIds.registerButton}
          href='/sign-up'
          className='flex items-center justify-center py-2 border-2 rounded-md hover:bg-slate-500/[0.2] transition-all w-80 border-primary-500' 
        >
          <p className='font-semibold text-primary-500'>
            Register
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Landing