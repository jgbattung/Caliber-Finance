import { FilledWalletIcon, FilledCircleMinusIcon, FilledPigMoneyIcon } from "@/components/icons";
import { IconProps, Icon, IconCirclePlusFilled, IconCircleArrowUpRightFilled, IconCircleArrowRightFilled, IconHomeFilled, IconSwitchHorizontal, IconTargetArrow, IconGraph, IconRefresh, IconCreditCardFilled } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ISidebarQuickActions = {
  buttonId: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  text: string
}

export const sidebarQuickActions: ISidebarQuickActions[] = [
  {
    buttonId: 'add-income',
    Icon: IconCirclePlusFilled,
    text: 'Add Income',
  },
  {
    buttonId: 'add-expense',
    Icon: FilledCircleMinusIcon,
    text: 'Add Expense',
  },
  {
    buttonId: 'add-transfer',
    Icon: IconCircleArrowUpRightFilled,
    text: 'Add Transfer',
  },
  {
    buttonId: 'add-to-goal',
    Icon: IconCircleArrowRightFilled,
    text: 'Add to Goal',
  },
];

export type ISidebarMainMenuLinks = {
  buttonId: string;
  route: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  text: string;
};

export const sidebarMainMenuLinks: ISidebarMainMenuLinks[] = [
  {
    buttonId: 'dashboard',
    route: '/',
    Icon: IconHomeFilled,
    text: 'Dashboard'
  },
  {
    buttonId: 'accounts',
    route: '/accounts',
    Icon: FilledWalletIcon,
    text: 'Accounts'
  },
  {
    buttonId: 'transactions',
    route: '/transactions',
    Icon: IconSwitchHorizontal,
    text: 'Transactions'
  },
  {
    buttonId: 'budgets',
    route: '/budgets',
    Icon: FilledPigMoneyIcon,
    text: 'Budgets'
  },
  {
    buttonId: 'targets',
    route: '/targets',
    Icon: IconTargetArrow,
    text: 'targets'
  },
  {
    buttonId: 'reports',
    route: '/reports',
    Icon: IconGraph,
    text: 'Reports'
  },
  {
    buttonId: 'subscriptions',
    route: '/subscriptions',
    Icon: IconRefresh,
    text: 'Subscriptions'
  },
  {
    buttonId: 'cards',
    route: '/cards',
    Icon: IconCreditCardFilled,
    text: 'Cards'
  },
];