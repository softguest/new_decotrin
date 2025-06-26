import React from 'react'
import SearchBar from '../SearchBar'
import Link from 'next/link'
import { FaBookOpen, FaCog, FaFeather, FaHome, FaUserCircle, FaUserMd, FaUsers } from 'react-icons/fa'
import { useCurrentUser } from "@/hooks/use-current-user";

const SideMenu = () => {
  const user = useCurrentUser();
  return (
    <nav className="flex flex-col h-full p-4 space-y-4">
          <h2 className="text-xl text font-bold mb-4">Dashboard</h2>
          <div className='md:hidden'>
            <SearchBar />
          </div>
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-indigo-600">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link href="/profile" className="flex items-center space-x-2 hover:text-indigo-600">
            <FaUserCircle />
            <span>My Profile</span>
          </Link>

          <Link href="/dashboard/coaches" className="flex items-center space-x-2 hover:text-indigo-600">
            <FaUserMd />
            <span>Trauma Coaches</span>
          </Link>

          <Link href="/article" className="flex items-center space-x-2 hover:text-indigo-600">
            <FaBookOpen />
            <span>Articles</span>
          </Link>

          <Link href="/settings" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-600">
            <FaCog />
            <span>Settings</span>
          </Link>
          <hr />
          {(user?.role === 'ADMIN' || user?.role === 'COACHE') && (
            <>
                <Link href="/dashboard/articles/create" className="flex items-center space-x-2 hover:text-indigo-600">
                    <FaFeather />
                    <span>Create Article</span>
                </Link>
            </>
            )}
            {(user?.role === 'ADMIN') && (
            <>
                <Link href="/admin" className="flex items-center space-x-2 hover:text-indigo-600">
                    <FaUsers />
                    <span>Manage Users</span>
                </Link>
            </>
            )}
        </nav>
  )
}

export default SideMenu