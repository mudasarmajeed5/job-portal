"use client"
import { FaGithub } from "react-icons/fa"
import { login } from "@/lib/auth"
export default function SignInPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg mx-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Job Board</h2>
                        <p className="text-gray-600">Sign in to post jobs or Apply</p>
                    </div>
                    <div className="mt-8">
                        <button onClick={login} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white">
                            <FaGithub /><span className="text-base font-medium">Continue with Github</span>
                        </button>
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-500">
                        By Signing in, you agree to our
                        <a className="text-indigo-600 hover:text-indigo-500"> terms of service </a>
                        and
                        <a className="text-indigo-600 hover:text-indigo-500"> privacy policy</a>
                    </div>
                </div>
            </div>
        </>
    )
}