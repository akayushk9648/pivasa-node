import React from "react";
import Image from "next/image";

export default function Logo({
  light = false,
  showText = true,
  size = "md",
}: {
  light?: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const heightClass = size === "sm" ? "h-7" : size === "lg" ? "h-12" : "h-9";
  const imgWidth = size === "sm" ? 28 : size === "lg" ? 48 : 36;
  const imgHeight = size === "sm" ? 34 : size === "lg" ? 58 : 44;

  return (
    <div className="flex items-center gap-2.5 font-extrabold tracking-tight select-none">
      <div className={`relative ${heightClass} w-auto flex-shrink-0 flex items-center justify-center`}>
        <Image
          src="/logo.png"
          alt="Pivasa Power Logo"
          width={imgWidth}
          height={imgHeight}
          className={`${heightClass} w-auto object-contain drop-shadow-md`}
          priority
        />
      </div>
      {showText && (
        <div className={`${size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"} leading-none`}>
          <span className="text-primary font-black">PIVASA</span>
          <span className={light ? "text-white font-bold ml-1" : "text-navy font-bold ml-1"}>POWER</span>
          <span className="block text-[9px] tracking-widest uppercase font-semibold text-muted-foreground mt-0.5">
            Energy & Battery Hub
          </span>
        </div>
      )}
    </div>
  );
}
