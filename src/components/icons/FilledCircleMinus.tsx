import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Icon, IconProps } from '@tabler/icons-react';

const FilledCircleMinusIcon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> = forwardRef((props, ref) => {
  const { size = 24, color = 'currentColor', stroke = 2, ...otherProps } = props;

  const minusStroke = Math.min(stroke as number * 1.5, 4);

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
      <circle cx="12" cy="12" r="10" fill={color} stroke="none" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="black" strokeWidth={minusStroke} />
    </svg>
  );
}) as ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

FilledCircleMinusIcon.displayName = 'FilledCircleMinusIcon';

export default FilledCircleMinusIcon;