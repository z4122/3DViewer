import * as React from 'react';

function DropdownArrow(props?: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3257 7.18967C16.6697 7.57665 16.6348 8.16922 16.2479 8.51321L10.6229 13.5132C10.2676 13.8289 9.73238 13.8289 9.37717 13.5132L3.75217 8.51321C3.36519 8.16922 3.33033 7.57665 3.67431 7.18967C4.0183 6.80269 4.61087 6.76783 4.99785 7.11181L10 11.5582L15.0022 7.11181C15.3892 6.76783 15.9817 6.80269 16.3257 7.18967Z"
        fill="var(--Grey-800)"
      />
    </svg>
  );
}

export const DropdownArrowIcon = React.memo(DropdownArrow);
