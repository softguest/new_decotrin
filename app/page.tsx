"use client"
import { Poppins } from "next/font/google";
import Logo from "@/assets/images/school-logo.png"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  return (
    <main className='flex h-full flex-col items-center justify-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center' >
          <h1 className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
            )}>🔐Auth</h1>
          <p className='text-white text-lg'>Simple Authentication service</p>
          <div>
            <LoginButton>
                <Button variant="secondary" className="w-full" size="lg">Sign In</Button>
            </LoginButton>
          </div>
      </div>
    </main>
  )
}








