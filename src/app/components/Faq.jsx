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
    <section id="faqs" className="relative w-full bg-[#020617] py-24 px-6 overflow-hidden">
      {/* Background Radial Glow to match the deep blue/purple vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_#1e1b4b_0%,_transparent_50%)] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-[48px] font-[700] text-white text-center mb-16 tracking-tight">
          The Omni Questions Everyone`s Asking
        </h2>

        {/* FAQ List */}
        <div className="w-full space-y-4 mb-28">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {/* This div creates the thin magenta/purple gradient border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/30 rounded-2xl opacity-100" />
              
              <div className="relative bg-[#020617] rounded-2xl px-6 py-5 flex items-center justify-between border border-white/5 transition-all duration-300 group-hover:border-white/20">
                <span className="text-lg font-medium text-white tracking-wide">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </div>

              {/* Answer content (Optional: can be animated with Framer Motion if you have it) */}
              {openIndex === index && (
                <div className="relative px-6 py-4 text-white/60 text-sm leading-relaxed bg-[#020617] rounded-b-2xl -mt-2 border-x border-b border-white/5">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Studios Title */}
        <div className="flex flex-col items-center mb-10 w-full">
            <h3 className="text-[48px] font-[700] text-white mb-6">Studios</h3>
            
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 w-full max-w-5xl">
          {studios.map((num) => (
            <div
              key={num}
              className="aspect-square bg-[#f8fafc] rounded-[40px] flex items-center justify-center p-7 shadow-lg hover:scale-105 transition-all duration-300 h-[160px] w-[160px]"
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