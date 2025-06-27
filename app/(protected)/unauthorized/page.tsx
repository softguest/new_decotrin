'use client'

import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <ShieldAlert className="text-red-500 w-16 h-16" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600">
          You don’t have permission to view this page. Please contact your admin if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="default">Go to Home</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">Login with Different Account</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
