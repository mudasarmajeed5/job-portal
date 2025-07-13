import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";
import { FaArrowLeft } from "react-icons/fa";

export default async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
    const jobId = (await params).id;
    const job = await prisma.job.findUnique({
        where: {
            id: jobId
        },
        include: {
            postedBy: true
        }
    })
    if (!job) {
        notFound();
    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
            <Link
                href="/jobs"
                className="py-2 flex items-center gap-2 text-blue-800 underline rounded hover:text-blue-400"
            >
                <FaArrowLeft/>
                Back to Jobs
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-700">{job.company} — {job.location}</p>
            <p className="text-sm font-medium text-indigo-700">{job.type}</p>

            {job.salary && (
                <p className="text-sm font-bold text-green-600">Salary: {job.salary}</p>
            )}

            <p className="text-gray-800 mt-4">{job.description}</p>

            <p className="text-sm flex flex-col text-gray-500">
                Posted by <span className="font-bold text-gray-900">{job.postedBy?.name || "Unknown"}</span> <span>
                    about{" "}
                    {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                </span>
            </p>

            <div className="">
                <ApplyButton jobId={job.id} />

            </div>
        </div>
    )
}