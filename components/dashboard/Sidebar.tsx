'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import SideMenu from './menu/SideMenu'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6 text-cyan-800" /> : <Menu className="h-6 w-6 text-cyan-800" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-60 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SideMenu />
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </>
  )
}
