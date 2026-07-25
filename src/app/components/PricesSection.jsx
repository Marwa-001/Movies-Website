"use client";

import { Lock } from "lucide-react";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const PAGE_BG = "#030A1B";
const SIDE_ACCENT = "#228EE5";
const SIDE_BG = "#EBFAFF";
const SIDE_BUTTON_TEXT = "#EBFAFF"; // exact "Primary 2" value from Figma, not plain white

const SUGGESTED_FROM = "#0CC2FF";
const SUGGESTED_TO = "#275EE7";
const SUGGESTED_MID = "#1990F3";
const SUGGESTED_SHADOW = "34,142,229"; // #228EE5

// Card heights grew 500/600 -> 520/620 to give the 48px heading (up from 36px)
// room without cramping the rest of the card. The 100px gap between the two
// is preserved, since SUGGESTED_LINE_OFFSET below depends on it.
const SIDE_HEIGHT = 520;
const SUGGESTED_HEIGHT = 620;
const SUGGESTED_LINE_OFFSET = (SUGGESTED_HEIGHT - SIDE_HEIGHT) / 2; // 50

// Typography, pulled directly from the Figma inspector:
// Heading + price = "Web/Title 2/Bold": Lato 700, 48px, 100% line-height, 0 tracking
// Button label   = "Web/Body/Regular": Lato 400, 16px, 100% line-height, 0 tracking, centered
const TITLE_STYLE = {
  fontWeight: 700,
  fontSize: "48px",
  lineHeight: "100%",
  letterSpacing: "0px",
};
const BODY_STYLE = {
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "100%",
  letterSpacing: "0px",
  textAlign: "center",
};

const PricingCard = ({ plan }) => {
  const isSuggested = plan.type === "suggested";

  const cardStyle = {
    width: isSuggested ? "360px" : "320px",
    height: isSuggested ? `${SUGGESTED_HEIGHT}px` : `${SIDE_HEIGHT}px`,
    // The union-shadow fix: this filter is applied to the WRAPPER that holds
    // both the pegs and the card body, so the drop-shadow traces the combined
    // silhouette of everything inside it (rectangle + bars), not just the
    // rectangle. A plain box-shadow on the card body alone can never do this
    // since it only ever knows about its own box, not its siblings.
    filter: isSuggested
      ? `drop-shadow(0 8px 24px rgba(${SUGGESTED_SHADOW},0.16)) drop-shadow(0 -8px 24px rgba(${SUGGESTED_SHADOW},0.16))`
      : "drop-shadow(0 8px 42px rgba(112,144,176,0.10))",
  };

  const cutoutSize = isSuggested ? 40 : 32;

  return (
    <div
      className={`${lato.className} relative z-10 transition-transform duration-300 hover:scale-[1.02]`}
      style={cardStyle}
    >
      {/* --- Center Card Decoration Tabs --- */}
      {isSuggested && (
        <>
          {/* TOP SECTION (Shifted Right) */}
          <div
            className="absolute rounded-[16px]"
            style={{ width: 40, height: 90, left: "calc(50% + 15px)", top: -70, background: SUGGESTED_FROM, zIndex: 0 }}
          />
          <div
            className="absolute rounded-[16px]"
            style={{ width: 40, height: 70, left: "calc(50% + 95px)", top: -38, background: SUGGESTED_MID, zIndex: 0 }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 18,
              height: 18,
              left: "calc(50% + 27px)",
              top: -99,
              background: SUGGESTED_FROM,
              boxShadow: "0 0 15px 2px rgba(12,194,255,0.9)",
              zIndex: 10,
            }}
          />
          <div
            className="absolute rounded-b-[16px]"
            style={{ width: 40, height: 44, left: "calc(50% + 55px)", top: 0, background: PAGE_BG, zIndex: 10 }}
          />

          {/* BOTTOM SECTION (Inverted to the Left Side) */}
          <div
            className="absolute rounded-[16px]"
            style={{ width: 40, height: 90, left: "calc(50% - 55px)", bottom: -70, background: SUGGESTED_TO, zIndex: 0 }}
          />
          <div
            className="absolute rounded-[16px]"
            style={{ width: 40, height: 70, left: "calc(50% - 135px)", bottom: -38, background: SUGGESTED_MID, zIndex: 0 }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 18,
              height: 18,
              left: "calc(50% - 43px)",
              bottom: -99,
              background: SUGGESTED_TO,
              boxShadow: "0 0 15px 2px rgba(39,94,231,0.9)",
              zIndex: 10,
            }}
          />
          <div
            className="absolute rounded-t-[16px]"
            style={{ width: 40, height: 44, left: "calc(50% - 95px)", bottom: 0, background: PAGE_BG, zIndex: 10 }}
          />
        </>
      )}

      {/* --- Main Card Body --- */}
      {/* No box-shadow here anymore — the glow now lives on the wrapper above
          so it unions with the pegs instead of stopping at this rectangle. */}
      <div
        className="w-full h-full rounded-[40px] flex flex-col items-center pt-12 pb-10 px-6 relative overflow-visible z-[5]"
        style={
          isSuggested
            ? { background: `linear-gradient(135deg, ${SUGGESTED_FROM} 0%, ${SUGGESTED_TO} 100%)`, color: "#FFFFFF" }
            : { background: SIDE_BG, color: SIDE_ACCENT }
        }
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 style={TITLE_STYLE}>{plan.name}</h2>
          <p className="text-lg font-medium opacity-80 mt-2">{plan.duration}</p>
        </div>

        {/* --- TICKET SECTION (The Cutouts & Line) --- */}
        <div
          className="relative w-full flex items-center py-8"
          style={{ marginTop: isSuggested ? SUGGESTED_LINE_OFFSET : 0 }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: `${cutoutSize}px`,
              height: `${cutoutSize}px`,
              left: `-${cutoutSize / 2 + 24}px`,
              top: "50%",
              transform: "translateY(-50%)",
              background: PAGE_BG,
            }}
          />
          <div
            className="w-full border-t-2 border-dashed"
            style={{ borderColor: isSuggested ? "rgba(255,255,255,0.3)" : `${SIDE_ACCENT}33` }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: `${cutoutSize}px`,
              height: `${cutoutSize}px`,
              right: `-${cutoutSize / 2 + 24}px`,
              top: "50%",
              transform: "translateY(-50%)",
              background: PAGE_BG,
            }}
          />
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center flex-grow justify-start w-full mt-2">
          {plan.oldPrice && (
            <span className="text-2xl font-medium opacity-60 line-through decoration-red-500 decoration-2 mb-1">
              ${plan.oldPrice}
            </span>
          )}
          <span style={TITLE_STYLE}>${plan.price}</span>

          <div className="flex items-center gap-2 mt-6">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: isSuggested ? "#FFFFFF" : SIDE_ACCENT }} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">Cancel anytime</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="flex items-center justify-center gap-3 px-4 py-3 rounded-[12px] mb-12 transition-all active:scale-95 shadow-lg"
          style={{
            ...BODY_STYLE,
            background: isSuggested ? SIDE_BG : SIDE_ACCENT,
            color: isSuggested ? SUGGESTED_TO : SIDE_BUTTON_TEXT,
          }}
        >
          <Lock size={16} strokeWidth={3} />
          CONTINUE
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const plans = [
    { name: "Basic", duration: "3month", price: "15.140", type: "basic" },
    { name: "Suggested", duration: "6month", oldPrice: "24.990", price: "22.990", type: "suggested" },
    { name: "Premium", duration: "12month", price: "35.199", type: "premium" },
  ];

  return (
    <section
      className="min-h-screen flex flex-wrap items-center justify-center gap-10 p-10 py-30"
      style={{ background: PAGE_BG }}
    >
      {plans.map((plan, idx) => (
        <PricingCard key={idx} plan={plan} />
      ))}
    </section>
  );
}