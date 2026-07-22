"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, ImagePlus } from "lucide-react";
import { signupSchema, flattenZodErrors } from "@/lib/zod-schemas";
import { useSignup } from "@/hooks/useAuth";

const AVATAR_OPTIONS = [
  { id: "a1", bg: "bg-gradient-to-br from-rose-500 to-red-700" },
  { id: "a2", bg: "bg-gradient-to-br from-violet-500 to-purple-700" },
  { id: "a3", bg: "bg-gradient-to-br from-orange-400 to-amber-600" },
  { id: "a4", bg: "bg-gradient-to-br from-slate-500 to-slate-800" },
  { id: "a5", bg: "bg-gradient-to-br from-sky-500 to-blue-700" },
  { id: "a6", bg: "bg-gradient-to-br from-lime-400 to-green-600" },
  { id: "a7", bg: "bg-gradient-to-br from-pink-400 to-fuchsia-600" },
  { id: "a8", bg: "bg-gradient-to-br from-yellow-400 to-orange-500" },
  { id: "a9", bg: "bg-gradient-to-br from-cyan-400 to-teal-600" },
];

const inputClass =
  "w-full bg-[#131927]/60 border border-white/10 rounded-xl px-5 py-3 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#228EE5]/50 transition-all";

export default function SignupPage() {
  const router = useRouter();
  const signup = useSignup();

  const [step, setStep] = useState("form"); // "form" | "avatar" | "success"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setErrors({});
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      return;
    }
    signup.mutate(parsed.data, {
      onSuccess: () => setStep("avatar"),
      onError: (err) => setErrors(err.errors || { form: err.message }),
    });
  };

  const handleConfirmAvatar = () => setStep("success");

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
      {/* Absolute Back Arrow */}
      <button
        type="button"
        onClick={() => (step === "avatar" ? setStep("form") : router.push("/"))}
        className="absolute left-10 top-10 z-40 text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-7 w-7" />
      </button>

      {step === "form" ? (
        <div className="flex w-full h-full mt-5">
          {/* LEFT SIDE: Form Column */}
          <div className="flex flex-col justify-center shrink-0 z-20 pl-[100px] lg:pl-[120px]">
            <div style={{ width: "302px" }}>
              <h1 className="text-[72px] font-[700] text-white mb-6 tracking-tight leading-none">
                Welcome
              </h1>

              {/* Tabs with exact 24px styling */}
              <div className="flex items-center gap-10 mb-10">
                <Link href="/login" className="text-[24px] font-[700] text-gray-500 hover:text-gray-300 tracking-[2px] transition-colors">
                  LOGIN
                </Link>
                <div className="relative">
                  <span className="text-[24px] font-[700] text-white tracking-[2px] cursor-default">
                    SIGNUP
                  </span>
                  <div className="absolute -bottom-[4px] left-0 right-0 h-[2.5px] bg-[#228EE5] rounded-full shadow-[0_0_15px_rgba(34,142,229,1)]" />
                </div>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3.5">
                <div>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="FullName" className={inputClass} />
                  {errors.name && <p className="mt-1 text-[10px] text-rose-500">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
                  {errors.email && <p className="mt-1 text-[10px] text-rose-500">{errors.email}</p>}
                </div>
                <div>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="password" className={inputClass} />
                  {errors.password && <p className="mt-1 text-[10px] text-rose-500">{errors.password}</p>}
                </div>
                <div>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="repeat the password" className={inputClass} />
                  {errors.confirmPassword && <p className="mt-1 text-[10px] text-rose-500">{errors.confirmPassword}</p>}
                </div>
                <div className="relative">
                  <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="UserName" className={inputClass} />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  {errors.username && <p className="mt-1 text-[10px] text-rose-500">{errors.username}</p>}
                </div>

                {errors.form && <p className="text-center text-[10px] text-rose-500">{errors.form}</p>}

                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={signup.isPending}
                    className="bg-[#228EE5] hover:bg-blue-500 text-white text-[14px] font-bold rounded-[12px] shadow-[0_10px_30px_rgba(34,142,229,0.3)] active:scale-95 transition-all w-[160px] h-[48px] border-[1px] border-white"
                  >
                    {signup.isPending ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Cinematic Image */}
          <div className="flex-1 relative flex items-center justify-center p-[60px]">
            <div 
              className="relative w-full max-w-[850px] overflow-hidden rounded-[24px] shadow-2xl"
              style={{ height: "528px" }}
            >
              <Image src="/assets/auth.png" alt="" fill className="object-cover" priority />
              <div 
                className="absolute inset-y-0 left-0 w-32 z-10" 
                style={{ background: "linear-gradient(to right, #030A1B 0%, transparent 100%)" }}
              />
            </div>
          </div>
        </div>
      ) : step === "avatar" ? (
        /* STEP 2: CHOOSE AVATAR (Full Screen Center) */
        <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
          <h2 className="text-[32px] text-white mb-8">
            Hi <span className="font-bold">{form.username}</span>
          </h2>

          <div className="relative mb-10">
            <div className="w-32 h-32 rounded-full bg-[#228EE5] flex items-center justify-center shadow-[0_0_40px_rgba(34,142,229,0.4)]">
              <div className="w-[118px] h-[118px] rounded-full bg-[#030A1B] flex items-center justify-center overflow-hidden">
                {selectedAvatar ? (
                  <div className={`w-full h-full ${AVATAR_OPTIONS.find((a) => a.id === selectedAvatar)?.bg}`} />
                ) : (
                  <User className="w-12 h-12 text-[#228EE5]" />
                )}
              </div>
            </div>
          </div>

          <p className="text-[12px] font-bold text-gray-500 tracking-[2px] uppercase mb-10">Choose your profile</p>

          <div className="grid grid-cols-5 gap-6 mb-12">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`w-16 h-16 rounded-full ${avatar.bg} transition-all duration-300 ${
                  selectedAvatar === avatar.id ? "scale-110 ring-4 ring-[#228EE5] ring-offset-4 ring-offset-[#030A1B]" : "opacity-60 hover:opacity-100"
                }`}
              />
            ))}
            <button className="w-16 h-16 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all">
              <ImagePlus className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={handleConfirmAvatar}
            className="bg-[#228EE5] hover:bg-blue-500 text-white text-[14px] font-bold px-16 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(34,142,229,0.3)] transition-all"
          >
            Confirm
          </button>
        </div>
      ) : (
        /* STEP 3: SUCCESS (Full Screen Center) */
        <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
           <div className="relative mb-10">
              <div className="w-40 h-40 rounded-full bg-[#228EE5] flex items-center justify-center shadow-[0_0_60px_rgba(34,142,229,0.5)]">
                 <div className="w-[148px] h-[148px] rounded-full bg-[#030A1B] flex items-center justify-center overflow-hidden">
                    {selectedAvatar ? (
                       <div className={`w-full h-full ${AVATAR_OPTIONS.find((a) => a.id === selectedAvatar)?.bg}`} />
                    ) : (
                       <User className="w-16 h-16 text-[#228EE5]" />
                    )}
                 </div>
              </div>
           </div>
           <p className="text-[14px] font-bold text-gray-400 tracking-[3px] uppercase mb-12">{form.username}</p>
           <h2 className="text-4xl font-medium text-white tracking-wide mb-12">Your account has been successfully created</h2>
           <button
             onClick={() => router.push("/")}
             className="bg-[#228EE5] hover:bg-blue-500 text-white text-[15px] font-bold px-16 py-4 rounded-xl shadow-[0_10px_30px_rgba(34,142,229,0.3)] transition-all"
           >
             Start Watching
           </button>
        </div>
      )}
    </main>
  );
}