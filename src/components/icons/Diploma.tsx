import type { SVGProps } from 'react';

export function DiplomaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M9 18V5.5a2.5 2.5 0 0 1 5 0V18" />
      <path d="M10 7.5a2.5 2.5 0 0 1 5 0" />
      <path d="M12 11v-1" />
      <path d="M14 18v-3.5a2.5 2.5 0 1 0-5 0V18" />
    </svg>
  );
}
