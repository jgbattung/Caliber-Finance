"use client"
import { IconBell } from '@tabler/icons-react'
import React from 'react'

interface NotificationBellProps {
  count: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ count }) => {
  return (
    <div className='relative'>
      <IconBell
        size={28}
        stroke={1}
        className='text-color-primary'
      />
      {count > 0 && (
        <div className='absolute flex items-center justify-center w-3 h-3 p-2 text-xs rounded-lg -top-1.5 -right-0.5 bg-notification text-text-light-primary'>
          {count > 9 ? '9+' : count}
        </div>
      )}
    </div>
  )
}

export default NotificationBell