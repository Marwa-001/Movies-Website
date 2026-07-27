"use client";

import { Lock } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"] 
});

const SIDE_ACCENT = "#228EE5";
const BUTTON_GRADIENT = "linear-gradient(180deg, #0CC2FF 0%, #275EE7 100%)";

const PricingSection = () => {
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

  return (
    // Changed to flex-col and added padding-y for mobile spacing
    <div className={`flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-4 bg-[var(--bg-page)] min-h-screen p-6 lg:p-10 ${lato.className}`}>
      {plans.map((plan, index) => {
        const isSuggested = plan.type === "suggested";
        
        return (
          <div 
            key={index} 
            // Added width constraints for mobile so SVGs don't get too large or small
            className="relative shrink-0 flex justify-center transition-transform hover:scale-[1.02] duration-300 w-full max-w-[320px] sm:max-w-[380px] lg:w-auto lg:max-w-none"
          >
            {/* 1. BACKGROUND SVG LAYER - w-full ensures it scales to the container width */}
            <img 
              src={isSuggested ? "/assets/pricing/price-suggested.svg" : "/assets/pricing/price-basic-premium.svg"} 
              alt={plan.name}
              className="select-none pointer-events-none w-full h-auto"
            />

            {/* 2. SUGGESTED LINE OVERLAY */}
            {isSuggested && (
              <img 
                src="/assets/pricing/line.svg" 
                className="absolute top-[44%] left-0 w-full z-10 pointer-events-none" 
                alt="" 
              />
            )}

            {/* 3. CONTENT OVERLAY LAYER */}
            <div 
              className="absolute inset-0 flex flex-col items-center z-20 text-center"
              style={{ color: isSuggested ? "#FFFFFF" : SIDE_ACCENT }}
            >
              {/* Heading: Responsive text sizes */}
              <h2 
                className={`font-[700] text-[32px] sm:text-[40px] lg:text-[48px] leading-none tracking-tight ${
                  isSuggested ? "mt-[45%]" : "mt-[16%]"
                }`}
              >
                {plan.name}
              </h2>

              {/* Duration */}
              <span className="mt-2 lg:mt-4 text-[18px] lg:text-[24px] font-[400] opacity-80">
                {plan.duration}
              </span>

              {/* Spacer: Percentage heights keep it proportional */}
              <div className={isSuggested ? "h-[16%]" : "h-[22%]"} />

              {/* Pricing Section */}
              <div className="flex flex-col items-center">
                {plan.oldPrice && (
                  <span className="text-[18px] lg:text-[24px] font-[400] opacity-50 line-through decoration-red-500 mb-1">
                    ${plan.oldPrice}
                  </span>
                )}
                <span className="text-[32px] sm:text-[40px] lg:text-[48px] font-[700] leading-none">
                  ${plan.price}
                </span>

                <div className="flex items-center gap-2 mt-3 lg:mt-6">
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: isSuggested ? "#FFFFFF" : SIDE_ACCENT }} 
                  />
                  <span className="text-[14px] lg:text-[16px] font-[300]">Cancel anytime</span>
                </div>
              </div>

              {/* Button: Adjusted width for mobile scaling */}
              <button
                className={`absolute flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                  isSuggested ? "bottom-[23%]" : "bottom-[12%]"
                }`}
                style={{
                  width: "clamp(120px, 40%, 156px)", // Scalable width
                  height: "clamp(32px, 8%, 40px)",   // Scalable height
                  borderRadius: "12px",
                  background: isSuggested ? "#FFFFFF" : BUTTON_GRADIENT,
                  color: isSuggested ? "#275EE7" : "#FFFFFF",
                  fontSize: "clamp(10px, 3vw, 14px)",
                  fontWeight: 700,
                }}
              >
                <Lock className="w-3 h-3 lg:w-[14px] lg:h-[14px]" strokeWidth={3} />
                CONTINUE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingSection;