import { IconChevronDown, IconUserCircle } from '@tabler/icons-react'
import React from 'react'

const RightSidebar = () => {
  const notificationCount: number = 2;

  return (
    <div className='flex flex-col items-center justify-start px-4 py-10 border-l w-52 h-scren border-l-bg-dark'>
      <div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='relative'>
            <IconUserCircle
              size={75}
              stroke={1}
            />
            {notificationCount > 0 && (
              <div className='absolute flex items-center justify-center w-3 h-3 p-2.5 text-xs rounded-xl top-0.5 right-0.5 bg-notification text-text-light-primary'>
                {notificationCount > 9 ? '9+' : notificationCount}
              </div>
            )}
            <div className='absolute right-0 flex items-center justify-center w-6 h-6 rounded-full bottom-1 bg-light-100'>
              <IconChevronDown
                size={16}
                stroke={2}
                className='text-text-primary'
              />
            </div>
          </div>
          <p className='text-color-primary text-body-xs'>Jireh Battung</p>
        </div>
      </div>
      <div className='w-3/4 border-b-2 my-7 border-b-bg-dark' />
      <div className='text-left'>
        <p className='text-color primary text-accent-xs'>Recent Transactions</p>
      </div>
    </div>
  )
}

export default RightSidebar