"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Omni ?",
    answer: "Omni is your all-in-one entertainment destination featuring the world's greatest stories from HBO, Warner Bros., Disney+, and more.",
  },
  {
    question: "How do I Get Help If I Have Any Issues?",
    answer: "You can reach our 24/7 support team through the help center in the app or via our website's support page.",
  },
  {
    question: "Is Omni Good For Kids & Families?",
    answer: "Absolutely. Omni offers robust parental controls and a dedicated kids' mode with age-appropriate content.",
  },
  {
    question: "How much Does Omni Cost?",
    answer: "We offer several plans starting from a basic ad-supported tier to a premium 4K Ultra HD experience. Check our pricing page for details.",
  },
];

const studios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative w-full bg-[var(--bg-page)] py-12 md:py-24 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "var(--bg-glow)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <h2 className="hidden md:block text-3xl md:text-[48px] font-[700] text-[var(--text-primary)] text-center mb-16 tracking-tight">
          The Omni Questions Everyone`s Asking
        </h2>

        {/* FAQ List */}
        <div className="w-full space-y-[10px] md:space-y-[36px] mb-14 md:mb-28">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="relative border border-solid border-[#E93F9C] bg-[var(--bg-page)] rounded-[6px] md:rounded-[12px] px-4 py-1 md:px-6 md:py-5 flex items-center justify-between transition-all duration-300 group-hover:border-white/25">

                <span className="text-[10px] md:text-lg font-medium text-[var(--text-primary)] tracking-wide">
                  {item.question}
                </span>

                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-[var(--text-primary)]/70 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </div>

              {openIndex === index && (
                <div className="relative px-4 py-3 md:px-6 md:py-4 text-[var(--text-primary)]/60 text-[10px] md:text-sm leading-relaxed bg-[var(--bg-page)] rounded-b-[12px] -mt-2 border-x border-b border-[#E93F9C]/40">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Studios Title */}
        <div className="flex flex-col items-center mb-10 w-full">
            <h3 className="text-[20px] md:text-[48px] font-[500] md:font-[700] text-[var(--text-primary)] mb:3 md:mb-6">Studios</h3>
            
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-5 w-full max-w-5xl justify-items-center">
          {studios.map((num) => (
            <div
              key={num}
              className="aspect-square bg-[#f8fafc] rounded-xl md:rounded-[40px] flex items-center justify-center p-2 md:p-7 shadow-lg hover:scale-105 transition-all duration-300 w-[46px] h-[46px] md:w-[160px] md:h-[160px]"
            >
              <img
                src={`/assets/studios/${num}.png`}
                alt={`Studio Logo ${num}`}
                className="w-full h-full object-contain brightness-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}