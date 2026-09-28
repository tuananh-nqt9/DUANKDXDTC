/**
 * Zalo Icon Component
 * Logo chính thức của Zalo
 */

interface ZaloIconProps {
  className?: string;
}

export function ZaloIcon({ className = "w-6 h-6" }: ZaloIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 4C12.96 4 4 12.96 4 24C4 30.52 7.08 36.32 11.84 39.88L11.2 43.6C11.08 44.28 11.76 44.84 12.4 44.56L16.68 42.6C19 43.48 21.44 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4Z"
        fill="currentColor"
      />
      <path
        d="M19.2 28.4L15.6 21.2H13.6V30.8H15.6V23.6L19.2 30.8H21.2V21.2H19.2V28.4Z"
        fill="white"
      />
      <path
        d="M26.8 21.2H22.4V30.8H26.8C28.56 30.8 30 29.36 30 27.6V24.4C30 22.64 28.56 21.2 26.8 21.2ZM28 27.6C28 28.26 27.46 28.8 26.8 28.8H24.4V23.2H26.8C27.46 23.2 28 23.74 28 24.4V27.6Z"
        fill="white"
      />
      <path
        d="M34.4 21.2H30V30.8H34.4V28.8H32V26.8H34.4V24.8H32V23.2H34.4V21.2Z"
        fill="white"
      />
    </svg>
  );
}
