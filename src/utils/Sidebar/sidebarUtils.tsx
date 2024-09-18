import { FilledWalletIcon, FilledCircleMinusIcon, FilledPigMoneyIcon } from "@/components/icons";
import { IconProps, Icon, IconCirclePlusFilled, IconCircleArrowUpRightFilled, IconCircleArrowRightFilled, IconHomeFilled, IconSwitchHorizontal, IconTargetArrow, IconRefresh, IconCreditCardFilled, IconGraphFilled } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM, RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID, SIDEBAR_MAIN_MENU_BUTTON_ID, SIDEBAR_MAIN_MENU_TEXT, SIDEBAR_QUICK_ACTIONS_BUTTON_ID, SIDEBAR_QUICK_ACTIONS_TEXT } from "../constants";
import { LucideProps, User, Bell, Settings, UserPlus } from "lucide-react";

export type ISidebarQuickAction = {
  buttonId: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  text: string
}

export const sidebarQuickActions: ISidebarQuickAction[] = [
  {
    buttonId: SIDEBAR_QUICK_ACTIONS_BUTTON_ID.ADD_INCOME,
    Icon: IconCirclePlusFilled,
    text: SIDEBAR_QUICK_ACTIONS_TEXT.ADD_INCOME,
  },
  {
    buttonId: SIDEBAR_QUICK_ACTIONS_BUTTON_ID.ADD_EXPENSE,
    Icon: FilledCircleMinusIcon,
    text: SIDEBAR_QUICK_ACTIONS_TEXT.ADD_EXPENSE,
  },
  {
    buttonId: SIDEBAR_QUICK_ACTIONS_BUTTON_ID.ADD_TRANSFER,
    Icon: IconCircleArrowUpRightFilled,
    text: SIDEBAR_QUICK_ACTIONS_TEXT.ADD_TRANSFER,
  },
  {
    buttonId: SIDEBAR_QUICK_ACTIONS_BUTTON_ID.ADD_TO_GOAL,
    Icon: IconCircleArrowRightFilled,
    text: SIDEBAR_QUICK_ACTIONS_TEXT.ADD_TO_GOAL,
  },
];

export type ISidebarMainMenuLink = {
  buttonId: string;
  route: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  text: string;
};

export const sidebarMainMenuLinks: ISidebarMainMenuLink[] = [
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.DASHBOARD,
    route: '/',
    Icon: IconHomeFilled,
    text: SIDEBAR_MAIN_MENU_TEXT.DASHBOARD
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.ACCOUNTS,
    route: '/accounts',
    Icon: FilledWalletIcon,
    text: SIDEBAR_MAIN_MENU_TEXT.ACCOUNTS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.TRANSACTIONS,
    route: '/transactions',
    Icon: IconSwitchHorizontal,
    text: SIDEBAR_MAIN_MENU_TEXT.TRANSACTIONS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.BUDGETS,
    route: '/budgets',
    Icon: FilledPigMoneyIcon,
    text: SIDEBAR_MAIN_MENU_TEXT.BUDGETS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.TARGETS,
    route: '/targets',
    Icon: IconTargetArrow,
    text: SIDEBAR_MAIN_MENU_TEXT.TARGETS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.REPORTS,
    route: '/reports',
    Icon: IconGraphFilled,
    text: SIDEBAR_MAIN_MENU_TEXT.REPORTS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.SUBSCRIPTIONS,
    route: '/subscriptions',
    Icon: IconRefresh,
    text: SIDEBAR_MAIN_MENU_TEXT.SUBSCRIPTIONS
  },
  {
    buttonId: SIDEBAR_MAIN_MENU_BUTTON_ID.CARDS,
    route: '/cards',
    Icon: IconCreditCardFilled,
    text: SIDEBAR_MAIN_MENU_TEXT.CARDS
  },
];

export type ISidebarDropdownMenuLink = {
  id: string;
  key: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  href: string;
};

export const SidebarDropdownMenuLinks: ISidebarDropdownMenuLink[] = [
  {
    id: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.PROFILE,
    key: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.PROFILE,
    label: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.PROFILE,
    icon: User,
    href: '/profile'
  },
  {
    id: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.NOTIFICATIONS,
    key: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.NOTIFICATIONS,
    label: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.NOTIFICATIONS,
    icon: Bell,
    href: '/notifications'
  },
  {
    id: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.SETTINGS,
    key: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.SETTINGS,
    label: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.SETTINGS,
    icon: Settings,
    href: '/settings'
  },
  {
    id: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.INVITE_USERS,
    key: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM_ID.INVITE_USERS,
    label: RIGHT_SIDEBAR_DROPDOWN_MENU_ITEM.INVITE_USERS,
    icon: UserPlus,
    href: '/invite'
  },
];