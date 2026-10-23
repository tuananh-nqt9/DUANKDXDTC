import Image from "next/image";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
  theme?: "light" | "dark";
}

export default function Logo({ variant = "full", className = "", theme = "light" }: LogoProps) {
  const textColor = theme === "light" ? "text-white" : "text-primary-700";
  const subColor = theme === "light" ? "text-primary-200" : "text-gray-500";

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <div className="relative group flex-shrink-0">
        <Image
          src="/images/logo-thanhchuong.png"
          alt="THANH CHƯƠNG JSC Logo"
          width={56}
          height={56}
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full drop-shadow-md transition-transform duration-300 group-hover:scale-105 object-contain"
          priority
          quality={100}
        />
      </div>

      {variant === "full" && (
        <div className="min-w-0">
          <div className={`font-heading font-extrabold text-base sm:text-lg md:text-xl leading-tight tracking-tight truncate ${textColor}`}>
            THANH CHƯƠNG
          </div>
          <div className={`text-[10px] sm:text-[11px] font-semibold ${subColor} tracking-wide truncate`}>
            JSC • LAS-XD 795
          </div>
        </div>
      )}
    </div>
  );
}
