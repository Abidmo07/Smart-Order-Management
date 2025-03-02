"use client";
import axiosApi from '@/app/axios';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Register() {
  const router=useRouter();
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
  });
  const handleRegistration=async(e)=>{
    e.preventDefault();
    const csrf=await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    console.log(csrf);
    axiosApi.post("/register",formData).then((response)=>{
      console.log(response.data);
      router.push("/auth/email-verify")
    }).catch((error)=>console.error(error))

  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      <form onSubmit={handleRegistration} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e)=>{
              setFormData({...formData,name:e.target.value})
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e)=>{
              setFormData({...formData,email:e.target.value})
            }}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e)=>{
              setFormData({...formData,password:e.target.value})
            }}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Confirm your password"
            value={formData.password_confirmation}
            onChange={(e)=>{
              setFormData({...formData,password_confirmation:e.target.value})
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>

        {/* Already have an account */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  </div>
  )
}
