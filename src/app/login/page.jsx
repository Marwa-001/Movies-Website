"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Eye, EyeOff } from "lucide-react";
import { loginSchema, flattenZodErrors } from "@/lib/zod-schemas";
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const { user } = useAuthStore();

  const [step, setStep] = useState("form");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      return;
    }

    login.mutate(parsed.data, {
      onSuccess: () => {
        setStep("success");
        setTimeout(() => router.push("/"), 2000);
      },
      onError: (err) => setErrors(err.errors || { form: err.message }),
    });
  };

  return (
    <main 
      className="h-screen w-screen flex overflow-hidden relative"
      style={{
        backgroundColor: "#030A1B",
        backgroundImage: `
          radial-gradient(circle at 5% 95%, rgba(151, 71, 255, 0.2) 0%, transparent 40%),
          linear-gradient(180deg, #030A1B 0%, #02050c 100%)
        `
      }}
    >
      {/* Back Arrow - Absolute positioned to the top-left of the viewport */}
      <Link 
        href="/" 
        className="absolute left-10 top-10 z-40 text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-7 w-7" />
      </Link>

      {step === "form" ? (
        <div className="flex w-full h-full mt-5">
          {/* LEFT SIDE: Content Column (Approx 40% of 1440px) */}
          <div className="flex flex-col justify-center shrink-0 z-20 pl-[100px] lg:pl-[120px]">
            {/* The 302px Width Content Block */}
            <div style={{ width: "302px" }}>
              <h1 className="text-[72px] font-[700] text-white mb-8 tracking-tight leading-none">
                Welcome
              </h1>

              {/* Tabs with exact 24px font size */}
              <div className="flex items-center gap-10 mb-14">
                <div className="relative">
                  <span className="text-[24px] font-[700] text-white tracking-[2px] cursor-default">
                    LOGIN
                  </span>
                  <div className="absolute -bottom-[4px] left-0 right-0 h-[2.5px] bg-[#228EE5] rounded-full shadow-[0_0_15px_rgba(34,142,229,1)]" />
                </div>
                <Link 
                  href="/signup" 
                  className="text-[24px] font-[700] text-gray-500 hover:text-gray-300 tracking-[2px] transition-colors"
                >
                  SIGNUP
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full bg-[#131927]/60 border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#228EE5]/50 transition-all"
                  />
                  <User className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full bg-[#131927]/60 border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#228EE5]/50 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button type="button" className="text-[12px] text-gray-500 hover:text-gray-300 transition-colors uppercase font-bold tracking-widest">
                    Forgot Password?
                  </button>
                </div>

                {errors.form && <p className="text-center text-xs text-rose-500">{errors.form}</p>}

                <div className="pt-8 flex justify-center">
                  <button
                    type="submit"
                    disabled={login.isPending}
                    className="bg-[#228EE5] hover:bg-blue-500 text-white text-[15px] font-bold px-16 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(34,142,229,0.3)] active:scale-95 transition-all"
                  >
                    {login.isPending ? "LOGIN..." : "LOGIN"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Cinematic Image (Remaining 60%) */}
          <div className="flex-1 relative flex items-center justify-center p-[60px]">
            <div 
              className="relative w-full max-w-[850px] overflow-hidden rounded-[24px] shadow-2xl"
              style={{ height: "528px" }} // Centered vertically as per height requirement
            >
              <Image 
                src="/assets/auth.png" 
                alt="Cinematic Background" 
                fill 
                className="object-cover"
                priority 
              />
              {/* Subtle overlay to blend into background gradient */}
              <div 
                className="absolute inset-y-0 left-0 w-32 z-10" 
                style={{
                  background: "linear-gradient(to right, #030A1B 0%, transparent 100%)"
                }}
              />
            </div>
          </div>
        </div>
      ) : (
       /* SUCCESS STATE */
<div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
   <div className="relative mb-10">
      <div className="w-40 h-40 rounded-full bg-[#228EE5] flex items-center justify-center shadow-[0_0_60px_rgba(34,142,229,0.5)]">
         
         {/* Updated Container */}
         <div className="relative w-[148px] h-[148px] rounded-full bg-[#030A1B] flex items-center justify-center overflow-hidden">
            {user?.avatarUrl ? (
               <Image 
                  src={user.avatarUrl} 
                  alt="User Avatar" 
                  fill 
                  className="object-cover" 
               />
            ) : (
               <User className="w-16 h-16 text-[#228EE5]" />
            )}
         </div>
         
      </div>
   </div>
   
   <p className="text-[14px] font-bold text-gray-400 tracking-[3px] uppercase mb-12">
      {/* Show username if available, else show email prefix */}
      {user?.username || form.email.split('@')[0]}
   </p>
   
   <h2 className="text-4xl font-medium text-white tracking-wide">
      You have successfully logged in
   </h2>
</div>
      )}
    </main>
  );
}