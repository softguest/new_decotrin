
import { Poppins } from "next/font/google";
import { RegisterForm } from "@/components/auth/register-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

const RegisterPage = () => {
  return (     
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="relative bg-gradient-to-b from-blue-700 to-blue-500 p-10 text-white flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold">WELCOME BACK</h2>
          <p className="font-bold text-1xl">SignUp With The Best Solution Providers</p>
          <p className="text-sm leading-relaxed">
              Decotrin connects you with experienced trauma coaches, backed by the power of AI. Whether you`&apos;`re seeking guidance or offering 
              support, our platform makes personalized healing accessible, private, and effective.
          </p>

          {/* Bubbles */}
          <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 bg-blue-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-600 rounded-full opacity-70"></div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex flex-col justify-center items-center py-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
 
export default RegisterPage;