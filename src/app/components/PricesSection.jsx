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
    <div className={`flex items-center justify-center gap-4 bg-[var(--bg-page)] min-h-screen p-10 ${lato.className}`}>
      {plans.map((plan, index) => {
        const isSuggested = plan.type === "suggested";
        
        return (
          <div key={index} className="relative shrink-0 flex justify-center transition-transform hover:scale-[1.02] duration-300">
            {/* 1. BACKGROUND SVG LAYER */}
            <img 
              src={isSuggested ? "/assets/pricing/price-suggested.svg" : "/assets/pricing/price-basic-premium.svg"} 
              alt={plan.name}
              className="select-none pointer-events-none"
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
              {/* Heading: Adjusted top margins to clear decorative elements */}
              <h2 
                className={`font-[700] text-[48px] leading-none tracking-tight ${
                  isSuggested ? "mt-[45%]" : "mt-[16%]"
                }`}
              >
                {plan.name}
              </h2>

              {/* Duration */}
              <span className="mt-4 text-[24px] font-[400] opacity-80">
                {plan.duration}
              </span>

              {/* Spacer: Adjusted to push pricing content precisely below the dash line */}
              <div className={isSuggested ? "h-[16%]" : "h-[22%]"} />

              {/* Pricing Section */}
              <div className="flex flex-col items-center">
                {plan.oldPrice && (
                  <span className="text-[24px] font-[400] opacity-50 line-through decoration-red-500 mb-1">
                    ${plan.oldPrice}
                  </span>
                )}
                <span className="text-[48px] font-[700] leading-none">
                  ${plan.price}
                </span>

                <div className="flex items-center gap-2 mt-6">
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: isSuggested ? "#FFFFFF" : SIDE_ACCENT }} 
                  />
                  <span className="text-[16px] font-[300]">Cancel anytime</span>
                </div>
              </div>

              {/* Button: Adjusted bottom positioning to clear bottom decorative "drips" */}
              <button
                className={`absolute flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                  isSuggested ? "bottom-[23%]" : "bottom-[12%]"
                }`}
                style={{
                  width: "156px",
                  height: "40px",
                  borderRadius: "12px",
                  background: isSuggested ? "#FFFFFF" : BUTTON_GRADIENT,
                  color: isSuggested ? "#275EE7" : "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <Lock size={14} strokeWidth={3} />
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