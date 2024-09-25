"use client"

import React from 'react'
import { Button } from '../ui/button'
import { ISidebarMainMenuLink, ISidebarQuickAction, sidebarMainMenuLinks, sidebarQuickActions } from '@/utils/Sidebar/sidebarUtils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { leftSidebarTestIds } from '@/utils/constants'

const LeftSidebar: React.FC = () => {
  const currentPathname = usePathname();
  const renderQuickActions = (action: ISidebarQuickAction) => {
    const Icon = action.Icon

    return (
      <Button
        data-testid={action.buttonId}
        key={action.buttonId}
        className='flex items-center px-2 py-1 justify-start w-full gap-2 text-left transition-all bg-transparent border border-solid hover:bg-slate-300/[0.2] border-color text-color-primary group'
      >
        <Icon
          data-testid={`icon-${action.buttonId}`}
          size={18}
          stroke={1}
        />
        <p
          data-testid={action.text}
          className='text-accent-3xs'
        >
          {action.text}
        </p>
      </Button>
    )
  };

  const renderMainMenuLinks = (link: ISidebarMainMenuLink) => {
    const isActive = currentPathname === link.route
    const Icon = link.Icon

    return (
      <Link
        data-testid={link.buttonId}
        key={link.text}
        href={link.route}
        className={`flex px-2 py-2 rounded-md items-center justify-start w-full gap-2 text-left group ${isActive ? 'bg-primary-500 text-text-light-primary' : ''}`}
      >
        <Icon 
          data-testid={`icon-${link.buttonId}`}
          size={19}
          stroke={1}
          className={`transition-all ${isActive ? '' : 'group-hover:text-primary-600'}`}
        />
        <p
          data-testid={link.text}
          className={`transition-all text-accent-xs ${isActive ? 'font-medium' : 'group-hover:text-primary-700'}`}
          >
            {link.text}
          </p>
      </Link>
    )
  };

  return (
    <div
      data-testid={leftSidebarTestIds.leftSidebar}
      className='flex flex-col items-center justify-center w-56 h-screen gap-8 p-6 border-r max-lg:hidden border-r-bg-dark'
    >
      <div className='flex flex-col items-start justify-center w-full gap-8'>
        <div className='flex flex-col gap-4'>
          <p className='font-light text-accent-xs text-color-secondary'>Quick Actions</p>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              {sidebarQuickActions.map(renderQuickActions)}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
        <p className='font-light text-accent-xs text-color-secondary'>Main Menu</p>
          <div className='flex flex-col gap-2'>
            {sidebarMainMenuLinks.map(renderMainMenuLinks)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar