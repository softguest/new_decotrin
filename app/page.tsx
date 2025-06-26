// "use client"
// import { Poppins } from "next/font/google";
// import Logo from "@/assets/images/school-logo.png"
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button"
// import { LoginButton } from "@/components/auth/login-button";
import { LoginForm } from "@/components/auth/login-form";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"]
// })

// export default function LoginPage() {
//   return (
//     <div className="h-full flex items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400 to-indigo-800">
//       <LoginForm />
//     </div>
//   )

// }

import { ReactNode } from 'react'

interface AuthLayoutProps {
  title?: string
  description?: string
  children: ReactNode
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="relative bg-gradient-to-b from-blue-700 to-blue-500 p-10 text-white flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold">WELCOME BACK</h2>
          <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan justo ac ex dapibus, vitae fermentum enim porta.
          </p>

          {/* Bubbles */}
          <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-blue-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-600 rounded-full opacity-50"></div>
        </div>

        {/* Right Side (Form) */}
        <div className="p-10 flex flex-col justify-center space-y-6">
          {/* {children} */}
          <LoginForm />
        </div>
      </div>
    </div>
  )
}







