"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ApplyButtonProps = {
    jobId: string
}
const ApplyButton = ({ jobId }: ApplyButtonProps) => {
    const { data: session, status } = useSession();
    const [errorMessage, setErrorMessage] = useState("");
    const [applicationStatus, setApplicationStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const router = useRouter()
    const handleApply = async () => {
        if (!session) {
            router.push("/auth/signin")
            return;
        }
        setErrorMessage("")
        setApplicationStatus("idle")
        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`,
                {
                    method: "POST",
                }
            )
            setApplicationStatus("success")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            }
            else {
                setErrorMessage("Failed to apply for Job")
            }
            setApplicationStatus("error")
        }
    }
    if (status == "loading") {
        return (<button disabled>Loading</button>)
    }
    if (applicationStatus == "success") {
        return <div className="text-center">
            <p className="text-green-600 text-lg mb-4">
                Application submitted successfully
            </p>

            <Link
                href="/dashboard"
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold underline transition duration-200"
            >
                View your Applications Page
            </Link>

        </div>
    }
    return (
        <>
            <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
                Apply for this Position
            </button>

            {
                applicationStatus == "error" && <p>{errorMessage}</p>
            }
        </>
    )
}

export default ApplyButton