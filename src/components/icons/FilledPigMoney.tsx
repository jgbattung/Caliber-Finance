import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Icon, IconProps } from '@tabler/icons-react';

const FilledPigMoneyIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> = forwardRef((props, ref) => {
  const { size = 24, color = 'currentColor', stroke = 2, ...otherProps } = props;

  return (
    <svg
      ref={ref as React.Ref<SVGSVGElement>}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 11v.01" />
      <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
      <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" fill={color} />
    </svg>
  );
}) as ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

FilledPigMoneyIcon.displayName = 'FilledPigMoneyIcon';

export default FilledPigMoneyIcon;