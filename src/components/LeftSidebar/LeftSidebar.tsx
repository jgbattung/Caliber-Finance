import Image from 'next/image'
import React from 'react'
import logo from './../../public/assets/logo-dark.png'
import { Button } from '../ui/button'
import { ISidebarQuickActions, sidebarQuickActions } from '@/utils/Sidebar/sidebarUtils'

const LeftSidebar = () => {
  const renderQuickActions = (action: ISidebarQuickActions) => {
    const Icon = action.Icon

    return (
      <Button
        key={action.buttonId}
        className='flex items-center justify-start w-full gap-2 text-left transition-all bg-transparent border border-solid hover:bg-slate-300/[0.2] border-color text-color-primary group'
      >
        <Icon
          size={18}
          stroke={1}
        />
        <p className='text-accent-xs'>{action.text}</p>
      </Button>
    )
  };

  return (
    <div className='flex flex-col items-center justify-center gap-8 p-8 border-r max-lg:hidden w-60 border-r-bg-dark'>
      <div className='flex items-center justify-center'>
        <Image
          src={logo}
          alt='Caliber Logo'
          width={200}
          height={200}
        />
      </div>
      <div className='flex flex-col items-start justify-center w-full gap-8'>
        <div className='flex flex-col gap-6'>
          <p className='font-light text-accent-xs text-color-secondary'>Quick Actions</p>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              {sidebarQuickActions.map(renderQuickActions)}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
        <p className='font-light text-accent-xs text-color-secondary'>Main Menu</p>
          <div>
            <Button>
              Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar