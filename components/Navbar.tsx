"use client"
import { logout } from "@/lib/auth"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    const { data: session } = useSession();
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href={"/"} className="flex items-center">
                            <Image src={"/logo.png"} alt="Job Portal Logo" className="h-8 w-auto" width={40} height={40} />
                            <span className="ml-2 text-xl font-semibold text-gray-900">Job Board</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium" href={"/jobs"}>Browse Jobs</Link>
                        {session ? (

                            <>
                                <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium" href={"/jobs/post"}>Post a Job</Link>
                                <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium" href={"/dashboard"}>Dashboard</Link>
                                <button className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium" onClick={()=>logout()}>Sign out</button>
                            </>
                        ) : (
                            <Link className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium" href={"/auth/signin"}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar