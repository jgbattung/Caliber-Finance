import Image from 'next/image'
import React from 'react'
import Logo from '../public/assets/logo.png'
import Link from 'next/link'

const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-around h-dvh'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image 
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
          href='/sign-in'
          className='flex items-center justify-center py-2 transition-all border rounded-md w-80 hover:bg-primary-600 bg-primary-500 border-primary-500'
        >
          <p className='font-semibold text-light-100'>
            Login
          </p>
        </Link>
        <Link
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