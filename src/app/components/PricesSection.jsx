"use client";

import { ShoppingBag } from "lucide-react";

const PricingCard = ({ plan }) => {
  const isSuggested = plan.type === "suggested";

  return (
    <div className="relative group">
      {/* Liquid Protrusions (Only for Suggested) */}
      {isSuggested && (
        <>
          {/* Top Drips */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-end gap-2 z-0">
            <div className="w-4 h-12 bg-[#00A3FF] rounded-full shadow-[0_0_15px_rgba(0,163,255,0.5)]" />
            <div className="w-4 h-20 bg-[#00A3FF] rounded-full shadow-[0_0_15px_rgba(0,163,255,0.5)]" />
            <div className="w-4 h-10 bg-[#00A3FF] rounded-full shadow-[0_0_15px_rgba(0,163,255,0.5)]" />
          </div>
          {/* Bottom Drips */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-start gap-2 z-0">
            <div className="w-4 h-12 bg-[#2E5BFF] rounded-full shadow-[0_0_15px_rgba(46,91,255,0.5)]" />
            <div className="w-4 h-20 bg-[#2E5BFF] rounded-full shadow-[0_0_15px_rgba(46,91,255,0.5)]" />
            <div className="w-4 h-10 bg-[#2E5BFF] rounded-full shadow-[0_0_15px_rgba(46,91,255,0.5)]" />
          </div>
          {/* Floating Dot */}
          <div className="absolute -top-16 left-[52%] w-4 h-4 bg-[#00A3FF] rounded-full shadow-[0_0_10px_rgba(0,163,255,0.8)]" />
          <div className="absolute -bottom-16 left-[48%] w-4 h-4 bg-[#2E5BFF] rounded-full shadow-[0_0_10px_rgba(46,91,255,0.8)]" />
        </>
      )}

      {/* Main Card Body */}
      <div
        className={`
        relative z-10 w-[300px] rounded-[40px] flex flex-col items-center py-10 px-6 overflow-visible transition-transform duration-500 group-hover:scale-105
        ${
          isSuggested
            ? "bg-gradient-to-b from-[#00A3FF] via-[#0088FF] to-[#2E5BFF] text-white shadow-[0_0_40px_rgba(0,163,255,0.3)] h-[580px]"
            : "bg-[#E2F1F8] text-[#1A73E8] h-[500px] shadow-xl"
        }
      `}
      >
        {/* Top Content */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold mb-2">{plan.name}</h2>
          <p className="text-lg opacity-80 font-medium">{plan.duration}</p>
        </div>

        {/* Ticket Seam Section */}
        <div className="relative w-full my-8 flex items-center justify-center">
          {/* Left Circle Cutout */}
          <div className={`absolute -left-10 w-8 h-8 rounded-full bg-[#050514]`} />
          {/* Right Circle Cutout */}
          <div className={`absolute -right-10 w-8 h-8 rounded-full bg-[#050514]`} />
          {/* Dashed Line */}
          <div
            className={`w-full border-t-2 border-dashed ${
              isSuggested ? "border-white/40" : "border-[#1A73E8]/30"
            }`}
          />
        </div>

        {/* Price Section */}
        <div className="flex flex-col items-center flex-grow">
          {plan.oldPrice && (
            <span className="text-3xl opacity-70 line-through decoration-red-500 decoration-2 mb-1">
              ${plan.oldPrice}
            </span>
          )}
          <span className="text-5xl font-extrabold mb-4">${plan.price}</span>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`w-1.5 h-1.5 rounded-full ${isSuggested ? "bg-white" : "bg-[#1A73E8]"}`} />
            Cancel anytime
          </div>
        </div>

        {/* Button */}
        <button
          className={`
          flex items-center gap-2 px-8 py-3 rounded-xl font-bold tracking-widest text-sm transition-all
          ${
            isSuggested
              ? "bg-[#E2F1F8] text-[#1A73E8] hover:bg-white shadow-lg"
              : "bg-[#1A73E8] text-white hover:bg-[#1557b0]"
          }
        `}
        >
          <ShoppingBag size={18} fill="currentColor" className="opacity-80" />
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const plans = [
    { name: "Basic", duration: "3month", price: "15.140", type: "basic" },
    {
      name: "Suggested",
      duration: "6month",
      oldPrice: "24.990",
      price: "22.990",
      type: "suggested",
    },
    { name: "Premium", duration: "12month", price: "35.199", type: "premium" },
  ];

  return (
    <section id="pricing" className="min-h-screen bg-[#050514] flex flex-wrap items-center justify-center gap-10 py-24 px-10">
      {plans.map((plan, idx) => (
        <PricingCard key={idx} plan={plan} />
      ))}
    </section>
  );
}