import { Icon, IconArrowsExchange, IconDots, IconGraph, IconHome, IconProps, IconWallet, } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type INavigationRoute = {
  route: string;
  iconId: string;
  text: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

export const bottomNavRoutes: INavigationRoute[] = [
  {
    route: '/',
    iconId: 'home',
    text: 'Home',
    Icon: IconHome,
  },
  {
    route: '/accounts',
    iconId: 'accounts',
    text: 'Accounts',
    Icon: IconWallet,
  },
  {
    route: '/transactions',
    iconId: 'transactions',
    text: 'Transactions',
    Icon: IconArrowsExchange,
  },
  {
    route: '/reports',
    iconId: 'reports',
    text: 'Reports',
    Icon: IconGraph,
  },
  {
    route: '/others',
    iconId: 'others',
    text: 'Others',
    Icon: IconDots,
  }
]