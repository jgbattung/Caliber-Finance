import React from 'react'
import "./../../app/globals.css";
import { IconUserCircle } from '@tabler/icons-react';
import NotificationBell from '../NotificationBell/NotificationBell';
import { headerTestIds } from '@/utils/constants';

const Header = () => {
  const notificationCount: number = 2;

  return (
    <div
      role='banner'
      data-testid={headerTestIds.header}
      className='flex items-center justify-between w-full px-4 py-4 border-b md:px-6 max-md:h-16 lg:hidden text-color-primary border-b-bg-dark'>
      <div className='flex flex-col md:flex-row md:items-end md:justify-center md:gap-1'>
        <p className='font-normal text-body-xs md:text-body-sm'>Good evening,</p>
        <p className='max-md:-mt-1.5 font-bold text-body-sm md:text-body'>Jireh John</p>
      </div>
      <div className='flex gap-3 md:gap-5 text-color-primary'>
        <NotificationBell
          count={notificationCount}
        />
        <IconUserCircle
          data-testid={headerTestIds.userProfileIcon}
          size={28}
          stroke={1}
        />
      </div>
    </div>
  )
}

export default Header