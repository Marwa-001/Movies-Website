"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, ImagePlus } from "lucide-react";
import { signupSchema, flattenZodErrors } from "@/lib/zod-schemas";
import { useSignup, useUpdateProfile } from "@/hooks/useAuth";

const AVATAR_OPTIONS = [
  { id: "a1", src: "/assets/avatars/1.png" },
  { id: "a2", src: "/assets/avatars/2.png" },
  { id: "a3", src: "/assets/avatars/3.png" },
  { id: "a4", src: "/assets/avatars/4.png" },
  { id: "a5", src: "/assets/avatars/5.png" },
  { id: "a6", src: "/assets/avatars/6.png" },
  { id: "a7", src: "/assets/avatars/7.png" },
  { id: "a8", src: "/assets/avatars/8.png" },
  { id: "a9", src: "/assets/avatars/9.png" },
];

const inputClass =
  "w-full bg-[#131927]/60 border border-white/10 rounded-xl px-5 py-3 text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-[#228EE5]/50 transition-all";

export default function SignupPage() {
  const router = useRouter();
  const signup = useSignup();
  const updateProfile = useUpdateProfile();

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

  const handleConfirmAvatar = () => {
    const chosen = AVATAR_OPTIONS.find((a) => a.id === selectedAvatar);
    if (chosen) {
      updateProfile.mutate(
        { avatarUrl: chosen.src },
        { onSettled: () => setStep("success") }
      );
    } else {
      setStep("success");
    }
  };

  const activeAvatarObj = AVATAR_OPTIONS.find((a) => a.id === selectedAvatar);

  return (
    <main 
      className="min-h-screen w-full flex flex-col overflow-x-hidden relative"
      style={{
        backgroundColor: "#030A1B",
        backgroundImage: `
          radial-gradient(circle at 5% 95%, rgba(151, 71, 255, 0.2) 0%, transparent 40%),
          linear-gradient(180deg, #030A1B 0%, #02050c 100%)
        `
      }}
    >
      {/* Back Arrow */}
      <button
        type="button"
        onClick={() => (step === "avatar" ? setStep("form") : router.push("/"))}
        className="absolute left-6 top-6 md:left-10 md:top-10 z-40 text-white/40 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-6 w-6 md:h-7 md:w-7" />
      </button>

      {step === "form" ? (
        <div className="flex flex-col lg:flex-row w-full flex-1 mt-16 lg:mt-5">
          {/* LEFT SIDE: Form Column */}
          <div className="flex flex-col justify-center items-center lg:items-start shrink-0 z-20 px-6 lg:pl-[100px] xl:pl-[120px] w-full lg:w-auto">
            {/* Strict 302px block on desktop */}
            <div className="w-full max-w-[302px]">
              <h1 className="text-[48px] md:text-[72px] font-[700] text-white mb-4 md:mb-6 tracking-tight leading-none text-center lg:text-left">
                Welcome
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-8 md:gap-10 mb-8 md:mb-10">
                <Link href="/login" className="text-[20px] md:text-[24px] font-[700] text-gray-500 hover:text-gray-300 tracking-[2px] transition-colors">
                  LOGIN
                </Link>
                <div className="relative">
                  <span className="text-[20px] md:text-[24px] font-[700] text-white tracking-[2px] cursor-default">
                    SIGNUP
                  </span>
                  <div className="absolute -bottom-[4px] left-0 right-0 h-[2.5px] bg-[#228EE5] rounded-full shadow-[0_0_15px_rgba(34,142,229,1)]" />
                </div>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-3.5">
                <div>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputClass} />
                  {errors.name && <p className="mt-1 text-[10px] text-rose-500">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
                  {errors.email && <p className="mt-1 text-[10px] text-rose-500">{errors.email}</p>}
                </div>
                <div>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} />
                  {errors.password && <p className="mt-1 text-[10px] text-rose-500">{errors.password}</p>}
                </div>
                <div>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat Password" className={inputClass} />
                  {errors.confirmPassword && <p className="mt-1 text-[10px] text-rose-500">{errors.confirmPassword}</p>}
                </div>
                <div className="relative">
                  <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="UserName" className={inputClass} />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  {errors.username && <p className="mt-1 text-[10px] text-rose-500">{errors.username}</p>}
                </div>

                {errors.form && <p className="text-center text-[10px] text-rose-500">{errors.form}</p>}

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={signup.isPending}
                    className="bg-[#228EE5] hover:bg-blue-500 text-white text-[14px] font-bold rounded-[12px] shadow-[0_10px_30px_rgba(34,142,229,0.3)] active:scale-95 transition-all w-full md:w-[160px] h-[48px] border-[1px] border-white"
                  >
                    {signup.isPending ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Image - Strictly Hidden on Mobile, Fixed Desktop view */}
          <div className="hidden lg:flex flex-1 relative items-center justify-center p-[40px] xl:p-[60px]">
            <div className="relative w-full max-w-[850px] overflow-hidden rounded-[24px] shadow-2xl" style={{ height: "528px" }}>
              <Image src="/assets/auth.png" alt="" fill className="object-cover" priority />
              <div className="absolute inset-y-0 left-0 w-32 z-10" style={{ background: "linear-gradient(to right, #030A1B 0%, transparent 100%)" }} />
            </div>
          </div>
        </div>
      ) : step === "avatar" ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <h2 className="text-[24px] md:text-[32px] text-white mb-6 md:mb-8 text-center">
            Hi <span className="font-bold">{form.username}</span>
          </h2>

          <div className="relative mb-8 md:mb-10">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#228EE5] flex items-center justify-center shadow-[0_0_40px_rgba(34,142,229,0.4)]">
              <div className="relative w-[100px] h-[100px] md:w-[118px] md:h-[118px] rounded-full bg-[#030A1B] flex items-center justify-center overflow-hidden">
                {selectedAvatar && activeAvatarObj ? (
                  <Image src={activeAvatarObj.src} alt="Selected Avatar" fill className="object-cover" />
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-[#228EE5]" />
                )}
              </div>
            </div>
          </div>

          <p className="text-[10px] md:text-[12px] font-bold text-gray-500 tracking-[2px] uppercase mb-8 md:mb-10">Choose your profile</p>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6 mb-10 md:mb-12">
            {AVATAR_OPTIONS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden transition-all duration-300 ${
                  selectedAvatar === avatar.id 
                    ? "scale-110 ring-4 ring-[#228EE5] ring-offset-2 md:ring-offset-4 ring-offset-[#030A1B]" 
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={avatar.src} alt="Avatar" fill className="object-cover" />
              </button>
            ))}
            <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all">
              <ImagePlus className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <button
            onClick={handleConfirmAvatar}
            className="bg-[#228EE5] hover:bg-blue-500 text-white text-[14px] font-bold px-12 md:px-16 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(34,142,229,0.3)] transition-all"
          >
            Confirm
          </button>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-700">
           <div className="relative mb-8 md:mb-10">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#228EE5] flex items-center justify-center shadow-[0_0_60px_rgba(34,142,229,0.5)]">
                 <div className="relative w-[118px] h-[118px] md:w-[148px] md:h-[148px] rounded-full bg-[#030A1B] flex items-center justify-center overflow-hidden">
                    {selectedAvatar && activeAvatarObj ? (
                       <Image src={activeAvatarObj.src} alt="Avatar" fill className="object-cover" />
                    ) : (
                       <User className="w-12 h-12 md:w-16 md:h-16 text-[#228EE5]" />
                    )}
                 </div>
              </div>
           </div>
           <p className="text-[12px] md:text-[14px] font-bold text-gray-400 tracking-[3px] uppercase mb-8 md:mb-12">{form.username}</p>
           <h2 className="text-2xl md:text-4xl font-medium text-white tracking-wide mb-8 md:mb-12 max-w-md">
             Your account has been successfully created
           </h2>
           <button
             onClick={() => router.push("/")}
             className="bg-[#228EE5] hover:bg-blue-500 text-white text-[14px] md:text-[15px] font-bold px-12 md:px-16 py-4 rounded-xl shadow-[0_10px_30px_rgba(34,142,229,0.3)] transition-all"
           >
             Start Watching
           </button>
        </div>
      )}
    </main>
  );
}