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
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <Image
          src="/images/logo-thanhchuong.png"
          alt="THANH CHƯƠNG JSC Logo"
          width={56}
          height={56}
          className="rounded-full drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
          priority
          quality={100}
        />
      </div>

      {variant === "full" && (
        <div>
          <div className={`font-heading font-extrabold text-xl leading-tight tracking-tight ${textColor}`}>
            THANH CHƯƠNG
          </div>
          <div className={`text-[11px] font-semibold ${subColor} tracking-wide`}>
            JSC • LAS-XD 795
          </div>
        </div>
      )}
    </div>
  );
}
