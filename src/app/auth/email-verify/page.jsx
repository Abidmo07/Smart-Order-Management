"use client";
import React from 'react'

export default function EmailVerify() {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-600 mb-6">
        We have sent a verification link to your email. Please check your inbox.
      </p>

      <button
        className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Resend Verification Email
      </button>

      <p className="text-sm text-gray-600 text-center mt-4">
        Wrong email?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Change Email
        </a>
      </p>
    </div>
  </div>  )
}
