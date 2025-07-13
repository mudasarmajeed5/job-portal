import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    orderBy: {
      postedAt: "desc",
    },
    take: 3,
    include: {
      postedBy: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-900">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-gray-600 text-lg">
          Discover the latest opportunities and apply with ease.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Recently Posted Jobs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {recentJobs.length === 0 ? (
            <p className="text-gray-500 col-span-full">No jobs posted yet.</p>
          ) : (
            recentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Company: {job.postedBy.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Posted on {new Date(job.postedAt).toLocaleDateString()}
                </p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-blue-600 hover:underline font-medium flex items-center gap-2"
                >
                  View Details <FaArrowRight />
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-indigo-50 rounded-lg py-12 px-6 text-center">
        <div className="flex justify-center mb-6 text-indigo-600">
          <MdWorkOutline className="text-6xl" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Create an account, upload your resume, and start applying to jobs that match your skills.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
        >
          Browse Jobs <FaBriefcase />
        </Link>
      </section>
    </div>
  );
}
