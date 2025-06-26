import { auth, signOut } from "@/auth";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import SignOut from "./SignOut";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default async function Navbar() {

  const session = await auth();

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between md:pl-4">
      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <h1 className="text-1xl md:text-3xl md:mr-10 font-semibold">DECO<span className="text-indigo-700">TRIN</span></h1>
        </Link>
        <div className="hidden md:block">
          <SearchBar />
        </div>
      </div>
      <div className="space-x-2 flex items-center">
        {/* Placeholder for user profile, notifications etc. */}
        <span className="text-[12px] md:text-sm text-gray-600 md:ml-16">
          Hi {session?.user?.firstName}
        </span>
        <div className="flex items-center space-x-2">
          <div>
            <Link href="/profile">
              <Image
                src={session?.user?.image || ""}
                alt={session?.user?.firstName || ""}
                width={35}  // Set explicit width for Next.js Image component
                height={35} // Set explicit height for Next.js Image component
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          </div>
          <SignOut />
        </div>
      </div>
    </header>
  )
}
