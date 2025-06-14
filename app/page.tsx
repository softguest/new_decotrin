"use client"
import { Poppins } from "next/font/google";
import Logo from "@/assets/images/school-logo.png"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";
import { LoginForm } from "@/components/auth/login-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400 to-indigo-800">
      <LoginForm />
    </div>
  )

}








