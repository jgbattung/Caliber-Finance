import { IconChevronDown, IconUserCircle } from '@tabler/icons-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import React from 'react'
import { Bell, LogOut, Settings, User, UserPlus } from 'lucide-react';
import { RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM, RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID } from '@/utils/constants';

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className='absolute right-0 flex items-center justify-center w-6 h-6 rounded-full bottom-1 icon-chevron-bg'
                >
                  <IconChevronDown
                    size={16}
                    stroke={2}
                    className='icon-chevron-color'
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-24 mr-4 bg-darker'>
                <DropdownMenuGroup>
                  <DropdownMenuItem id={RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.PROFILE}>
                    <User className="w-3.5 h-3.5 mr-2" />
                    <span className='text-accent-xs'>{RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.PROFILE}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem id={RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.NOTIFICATIONS}>
                    <Bell className="w-3.5 h-3.5 mr-2" />
                    <span className='text-accent-xs'>{RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.NOTIFICATIONS}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem id={RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.SETTINGS}>
                    <Settings className="w-3.5 h-3.5 mr-2" />
                    <span className='text-accent-xs'>{RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.SETTINGS}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem id={RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.INVITE_USERS}>
                    <UserPlus className="w-3.5 h-3.5 mr-2" />
                    <span className='text-accent-xs'>{RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.INVITE_USERS}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-dark' />
                <DropdownMenuGroup>
                <DropdownMenuItem id={RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.LOGOUT}>
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    <span className='text-accent-xs'>{RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.LOGOUT}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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