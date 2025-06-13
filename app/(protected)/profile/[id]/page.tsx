"use client"
import { Edit } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type User = {
  name:         String
  email:        String
  image:         String

  profession:    String
  Location:      String
  telephone:     String
  address:       String
  role:         String
  bio:           String
};

const MyProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ⬅️ loading state

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Fetch all content
        const [userRes] = await Promise.all([
          fetch(`/api/users/${id}`),
        ]);

        const userData = await userRes.json();

        setUser(userData);
      } catch (err) {
        console.error("Failed to load Profile detail:", err);
      } finally {
        setLoading(false); // ✅ Stop loading only after everything finishes
      }
    };

    loadAllData();
  }, [id]);

    
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
              src={user?.image?.toString()}
              alt={user?.name?.toString()}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
            />
            <h1 className="md:text-2xl font-bold border-b-4 border-indigo-400">{user?.name}</h1>
            <p className="text-gray-500">{user?.profession}</p>
          </div>

          {/* Right Edit Button */}
          <div className="md:w-1/3 flex justify-end items-start">
            
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📍 Location</h2>
            <p className="text-[12px] md:text-lg">{user?.Location}</p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📞 Telephone</h2>
            <p className="text-[12px] md:text-lg">
              {/* {user?.telephone} */}
              *************
              </p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">🏠 Address</h2>
            <p className="text-[12px] md:text-lg">
              {/* {user?.address} */}
              *************
            </p>
          </div>

          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">📧 Email</h2>
            <p className="text-[12px] md:text-lg">
              {/* {user?.email} */}
              *************
            </p>
          </div>
          <div className='flex justify-between items-center border-b-4 py-2'>
            <h2 className="text-sm text-gray-600">🙋🏾‍♂️ Your Role</h2>
            <p className="text-[12px] md:text-lg">{user?.role}</p>
          </div>
          <div className='p-4 rounded-xl bg-white'>  
            <span className='font-bold '>My Bio: </span>
            {user?.bio}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile