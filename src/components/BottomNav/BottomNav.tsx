"use client"

import React from 'react'
import "./../../app/globals.css";
import { usePathname } from 'next/navigation';
import { bottomNavRoutes, INavigationRoute } from '@/utils/NavigationRoutes/bottomNavRoutes';
import Link from 'next/link';
import { bottomNavTestIds } from '@/utils/constants';

const BottomNav: React.FC = () => {
  const currentPathname = usePathname();

  const renderNavItem = (route: INavigationRoute) => {
    const isActive = currentPathname === route.route;
    const Icon = route.Icon

    return (
      <Link
        id={route.text}
        href={route.route}
        key={route.text}
        className='flex flex-col items-center justify-center gap-1 group'
      >
        <Icon
          data-testid={`icon-${route.iconId}`}
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
    <nav
      data-testid={bottomNavTestIds.bottomNav}
      className='fixed bottom-0 flex items-center justify-around w-full py-4 border-t lg:hidden border-t-bg-dark'
    >
      {bottomNavRoutes.map(renderNavItem)}
    </nav>
  );
}

export default BottomNav