import { IconProps, Icon, IconCirclePlusFilled, IconCircleRectangleFilled, IconCircleArrowUpRightFilled, IconCircleArrowRightFilled } from "@tabler/icons-react";
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
    Icon: IconCircleRectangleFilled,
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