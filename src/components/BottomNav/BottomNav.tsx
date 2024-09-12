"use client"

import React from 'react'
import "./../../app/globals.css";
import { usePathname } from 'next/navigation';
import { bottomNavRoutes, NavigationRoute } from '@/utils/bottomNavRoutes';
import Link from 'next/link';

const BottomNav: React.FC = () => {
  const currentPathname = usePathname();

  const renderNavItem = (route: NavigationRoute) => {
    const isActive = currentPathname === route.route;
    const Icon = route.Icon

    return (
      <Link
        href={route.route}
        key={route.text}
        className='flex flex-col items-center justify-center gap-1 group'
      >
        <Icon
          size={28}
          stroke={1}
          className={`transition-colors ${isActive ? 'text-primary-500' : 'text-color-primary group-hover:text-primary-500'}`}
        />
        <p className={`max-sm:hidden font-extralight text-accent-xs ${isActive ? 'text-primary-500' : 'text-color-primary group-hover:text-primary-500'}`}>
          {route.text}
        </p>
      </Link>
    );
  };

  return (
    <nav className='fixed bottom-0 flex items-center justify-around w-full py-4 border-t lg:hidden border-t-bg-dark'>
      {bottomNavRoutes.map(renderNavItem)}
    </nav>
  );
}

export default BottomNav