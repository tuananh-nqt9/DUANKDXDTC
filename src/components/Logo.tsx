interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
  theme?: "light" | "dark";
}

export default function Logo({ variant = "full", className = "", theme = "light" }: LogoProps) {
  const textColor = theme === "light" ? "text-white" : "text-primary-700";
  const subColor = theme === "light" ? "text-primary-200" : "text-gray-500";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path
            d="M24 2L4 10v14c0 12.5 8.5 21.5 20 22 11.5-.5 20-9.5 20-22V10L24 2z"
            fill="url(#logoGradient)"
          />
          <g transform="translate(12, 14)">
            <rect x="0" y="8" width="10" height="14" fill="url(#goldGradient)" />
            <rect x="11" y="4" width="6" height="18" fill="#fbbf24" opacity="0.8" />
            <rect x="18" y="10" width="6" height="12" fill="url(#goldGradient)" />
            <rect x="1.5" y="11" width="2" height="2" fill="#7f1d1d" />
            <rect x="5" y="11" width="2" height="2" fill="#7f1d1d" />
            <rect x="1.5" y="16" width="2" height="2" fill="#7f1d1d" />
            <rect x="5" y="16" width="2" height="2" fill="#7f1d1d" />
            <rect x="12.5" y="8" width="2" height="2" fill="#7f1d1d" />
            <rect x="12.5" y="13" width="2" height="2" fill="#7f1d1d" />
            <rect x="19.5" y="14" width="2" height="2" fill="#7f1d1d" />
            <rect x="10" y="0" width="0.8" height="6" fill="#fbbf24" />
            <rect x="10" y="0" width="8" height="0.8" fill="#fbbf24" />
          </g>
        </svg>
      </div>

      {variant === "full" && (
        <div>
          <div className={`font-heading font-extrabold text-lg leading-tight ${textColor}`}>
            THANH CHƯƠNG
          </div>
          <div className={`text-xs font-medium ${subColor}`}>
            JSC • LAS-XD 795
          </div>
        </div>
      )}
    </div>
  );
}
