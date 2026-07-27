"use client";

import { Lock } from "lucide-react";
import { Lato } from "next/font/google";
import { useThemeStore } from "@/store/useThemeStore";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const SIDE_ACCENT = "#228EE5";
const BUTTON_GRADIENT = "linear-gradient(180deg, #0CC2FF 0%, #275EE7 100%)";

const PricingSection = () => {
  const theme = useThemeStore((s) => s.theme);
  const plans = [
    {
      name: "Basic",
      duration: "3month",
      price: "15.140",
      type: "side",
    },
    {
      name: "Suggested",
      duration: "6month",
      oldPrice: "24.990",
      price: "22.990",
      type: "suggested",
    },
    {
      name: "Premium",
      duration: "12month",
      price: "35.199",
      type: "side",
    },
  ];

  // Two dedicated assets per theme now — no more CSS filter hack.
  const sideCardSrc =
    theme === "light"
      ? "/assets/pricing/price-basic-premium-light.svg"
      : "/assets/pricing/price-basic-premium-dark.svg";

  return (
    // Changed to flex-col and added padding-y for mobile spacing
    <div className={`flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-4 bg-[var(--bg-page)] py-3 lg:min-h-screen lg:py-10 px-3 sm:p-6 ${lato.className}`}>
      {plans.map((plan, index) => {
        const isSuggested = plan.type === "suggested";

        return (
          <div
            key={index}
            /*
              MOBILE: fixed 95.3 x 157.25 card per spec (w-[95px], height follows
              the SVG's natural aspect ratio via h-auto below).
              sm/md/lg: identical to the original fluid/vw-based sizing — untouched.
            */
            className={`relative shrink-0 flex justify-center transition-transform hover:scale-[1.02] duration-300 ${
              isSuggested ? "w-[130px]" : "w-[95px]"
            } sm:w-[28vw] sm:max-w-[320px] md:max-w-[380px] lg:w-auto lg:max-w-none`}
          >
            {/* 1. BACKGROUND SVG LAYER - w-full ensures it scales to the container width */}
            <img
              src={isSuggested ? "/assets/pricing/price-suggested.svg" : sideCardSrc}
              alt={plan.name}
              className="select-none pointer-events-none w-full h-auto"
            />

            {/* 2. SUGGESTED LINE OVERLAY */}
            {isSuggested && (
              <img
                src="/assets/pricing/line.svg"
                className="absolute top-[44%] left-1/2 -translate-x-1/2 w-[76%] z-10 pointer-events-none"
                alt=""
              />
            )}

            {/* 3. CONTENT OVERLAY LAYER */}
            <div
              className="absolute inset-0 flex flex-col items-center z-20 text-center"
              style={{ color: isSuggested ? "#FFFFFF" : SIDE_ACCENT }}
            >
              {/* Heading — mobile: Lato Medium 16px / 100% / 0%. sm+/lg unchanged. */}
              <h2
                className={`font-[500] text-[16px] leading-none tracking-tight sm:font-[700] sm:text-[40px] lg:text-[48px] ${
                  isSuggested ? "mt-[45%]" : "mt-[16%]"
                }`}
              >
                {plan.name}
              </h2>

              {/* Duration — mobile: Lato Regular 10px / 100% / 0%. sm+/lg unchanged. */}
              <span className="mt-2 lg:mt-4 text-[10px] font-[400] leading-none opacity-80 sm:text-[18px] lg:text-[24px]">
                {plan.duration}
              </span>

              {/* Spacer: Percentage heights keep it proportional */}
              <div className={isSuggested ? "h-[16%]" : "h-[22%]"} />

              {/* Pricing Section */}
              <div className="flex flex-col items-center">
                {plan.oldPrice && (
                  <span className="text-[10px] font-[400] opacity-50 line-through decoration-red-500 mb-1 sm:text-[18px] lg:text-[24px]">
                    ${plan.oldPrice}
                  </span>
                )}
                {/* Price — mobile: Lato Light 14px / 100% / 0%. sm+/lg unchanged (700/40-48px). */}
                <span className="text-[14px] font-[300] leading-none sm:text-[40px] sm:font-[700] lg:text-[48px]">
                  ${plan.price}
                </span>

                <div className="flex items-center gap-2 mt-3 lg:mt-6">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isSuggested ? "#FFFFFF" : SIDE_ACCENT }}
                  />
                  {/* Cancel anytime — mobile: Lato Light 8px / 100% / 0%. sm+/lg unchanged. */}
                  <span className="text-[8px] font-[300] leading-none sm:text-[14px] lg:text-[16px]">
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/*
                Button — mobile: fixed 68x15, radius 4px, 1px border, padding 3px/2px,
                gap 5px per spec. sm+/lg: original clamp()-based sizing, no border,
                12px radius — fully unchanged from before.
              */}
              <button
                className={`absolute flex items-center justify-center transition-all active:scale-95 shadow-lg
                  gap-[5px] py-[3px] px-[2px] rounded-[4px] border border-white/25
                  w-[68px] h-[15px] text-[6px] font-bold
                  sm:gap-2 sm:py-0 sm:px-0 sm:rounded-[12px] sm:border-0
                  sm:w-[clamp(120px,40%,156px)] sm:h-[clamp(32px,8%,40px)] sm:text-[clamp(10px,3vw,14px)]
                  ${isSuggested ? "bottom-[23%]" : "bottom-[12%]"}`}
                style={{
                  background: isSuggested ? "#FFFFFF" : BUTTON_GRADIENT,
                  color: isSuggested ? "#275EE7" : "#FFFFFF",
                }}
              >
                <Lock className="w-2 h-2 sm:w-3 sm:h-3 lg:w-[14px] lg:h-[14px]" strokeWidth={3} />
                CONTIUNE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingSection;