import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Icon, IconProps } from '@tabler/icons-react';

const FilledWalletIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> = forwardRef((props, ref) => {
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
      <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" fill={color} />
      <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" fill={color} />
    </svg>
  );
}) as ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

FilledWalletIcon.displayName = 'FilledWalletIcon';

export default FilledWalletIcon;