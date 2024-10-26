import { useTheme } from 'next-themes';
import * as React from 'react';
import type { SVGProps } from 'react';

interface SvgParaformProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

const ParaformIcon: React.FC<SvgParaformProps> = ({ size, className, ...props }) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const fillColor = currentTheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={size || '300'}
      height={size || '300'}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill={fillColor}>
        <path d="M1065 2393 c-472 -61 -855 -373 -1004 -819 -99 -296 -73 -640 70
-919 211 -413 649 -671 1109 -652 312 13 568 121 789 331 337 322 455 805 306
1257 -135 405 -513 723 -945 794 -87 14 -250 18 -325 8z m675 -753 l0 -100
-400 0 c-288 0 -406 3 -425 12 -29 13 -55 55 -55 88 0 29 29 76 54 89 13 6
175 10 424 10 l402 1 0 -100z m0 -470 l0 -100 -660 0 c-490 0 -666 3 -685 12
-29 13 -55 55 -55 88 0 29 29 76 54 89 14 6 260 10 684 10 l662 1 0 -100z m0
-450 l0 -100 -260 0 c-179 0 -267 4 -285 12 -29 13 -55 55 -55 88 0 29 29 76
54 89 12 6 129 10 284 10 l262 1 0 -100z"/>
      </g>
    </svg>
  );
};

export default ParaformIcon;
