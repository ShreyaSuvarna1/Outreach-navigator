import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="40" height="40" rx="8" fill="hsl(var(--primary))" />
    <path
      d="M12 28V12H20V14.5H14.5V19H19.5V21.5H14.5V28H12Z"
      fill="hsl(var(--primary-foreground))"
    />
    <path
      d="M22.5 28V12H28V28H25.5V14.5H22.5V28Z"
      fill="hsl(var(--primary-foreground))"
    />
  </svg>
);

export default Logo;
