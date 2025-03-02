import Link from 'next/link'
import React from 'react'

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email, and we'll send you a link to reset your password.
        </p>

        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Remembered your password?{" "}
            <Link href={"/auth/login"} className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
