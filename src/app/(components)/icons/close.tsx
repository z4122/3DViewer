import * as React from 'react'

function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="0.799805"
        y="13.7184"
        width="18.2661"
        height="2.1"
        rx="1.05"
        transform="rotate(-45 0.799805 13.7184)"
        fill="#8A8A8A"
      />
      <rect
        x="2.28271"
        y="0.799988"
        width="18.2703"
        height="2.1"
        rx="1.05"
        transform="rotate(45 2.28271 0.799988)"
        fill="#8A8A8A"
      />
    </svg>
  )
}

export const CloseIcon = React.memo(Close)
