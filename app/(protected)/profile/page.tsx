import { auth, signOut } from '@/auth';
import SignOut from '@/components/dashboard/SignOut';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = async () => {
   const session = await auth();
    
  return (
     <div className="max-w-3xl mx-auto p-4 md:p-10 flex flex-col justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full">
        <div className=" md:flex md:justify-between gap-4">
          {/* Left Spacer or Future Content */}
          <div className="md:w-1/3 justify-start items-center hidden md:block">
            {/* Optional content or keep empty */}
          </div>

          {/* Centered Profile Info */}
          <div className="md:w-1/3 flex flex-col items-center gap-4 text-center">
            <img
              src={session?.user.image?.toString()}
              alt={session?.user.name?.toString()}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
            />
            <h1 className="text-1xl md:text-2xl font-bold border-b-4 border-indigo-400">{session?.user?.name}</h1>
            <p className="text-gray-500">
              {session?.user?.firstName}
              </p>
          </div>

          {/* Right Edit Button */}
          <div className="md:w-1/3 flex justify-end items-start">
            <div>
              <Link href="profile/" className="pt-4 flex justify-center items-center space-x-2 max-w-32">
                <Edit />
                <div>Edit profile</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📍 Location</h2>
            <p className="text-[12px] md:text-lg">
              {session?.user?.country}
              </p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📞 Telephone</h2>
            <p className="text-[12px] md:text-lg">
              
              {/* {session?.user?.telephone} */}
                *************
              </p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">🏠 Address</h2>
            <p className="text-[12px] md:text-lg">
              {session?.user?.cityName}
              </p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📧 Email</h2>
            <p className="text-[12px] md:text-lg">
              {/* {session?.user.email} */}
                *************
              </p>
          </div>
          <div className='flex justify-between items-center border-b-4 py-2'>
            <h1 className="text-sm text-gray-600">🙋🏾‍♂️ Your Role</h1>
            <p className="text-[12px] md:text-lg">{session?.user?.role}</p>
          </div>
        </div>
        <div className='bg-slate-200 p-4 rounded-xl'>
          {session?.user?.gender}
        </div>
        <div className='p-4 bg-white'>  
            <span className='font-bold '>My Bio: </span>
            {session?.user?.bio}
          </div>
        <div className="mt-4">
          <SignOut />
        </div>
      </div>
    </div>
  )
}

export default Profile;