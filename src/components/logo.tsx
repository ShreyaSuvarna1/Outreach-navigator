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
    <circle cx="20" cy="14" r="2.5" fill="hsl(var(--primary-foreground))" />
    <rect x="17.5" y="20" width="5" height="10" rx="1.5" fill="hsl(var(--primary-foreground))" />
  </svg>
);

export default Logo;