import { prisma } from "@/lib/prisma"
import Link from "next/link";

const Jobs = async (
  { searchParams }: {
    searchParams:
    Promise<{ [key: string]: string | string[] | undefined }>
  }
) => {
  const { q, type } = await searchParams;
  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = type as string | undefined
  const jobs = await prisma.job.findMany(
    {
      where: {
        AND: [
          query ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { company: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ]
          } :
            {},
          type ? { type: searchType } : {},
          searchLocation ?
            {
              location: { contains: searchLocation, mode: "insensitive" }
            } : {},
        ]
      },
      orderBy: {
        postedAt: "desc"
      },
      include: {
        postedBy: true
      }
    }
  );
  return (
    <div className="space-y-6">
      <div className="bg-white text-gray-900 p-6 rounded-lg-shadow-sm">
        <h1 className="text-2xl mb-6 font-bold">Find Jobs</h1>
        <form className="grid gap-4 md:grid-cols-4">
          <input type="text"
            name="q"
            placeholder="Search Jobs"
            className="border border-gray-300border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <select className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600" name="type" id="type" >
            <option value="">Select a type</option>
            <option value="Full-time">Full time</option>
            <option value="Part-time">Part time</option>
            <option value="Contact">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <input type="text"
            name="location"
            id="location"

            placeholder="Location., "
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">Search / Filter</button>
        </form>
        <div className="grid gap-6 mt-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <p className="text-gray-700">{job.company} — {job.location}</p>
              <p className="text-sm text-indigo-700 font-medium">{job.type}</p>
              <p className="mt-2 text-gray-800">{job.description.slice(0, 150)}...</p>

              {job.salary && (
                <div className="flex justify-between mt-1 items-center">
                  <span className="text-sm text-gray-500">.</span>
                  <span className="text-lg font-bold text-gray-800">Salary: {job.salary}</span>
                </div>
              )}

              <p className="text-sm text-gray-500 mt-1">
                Posted on {new Date(job.postedAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Posted by: {job.postedBy.name}
                </span>
                <Link href={`/jobs/${job.id}`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>

          ))}
        </div>

      </div>
    </div>
  )
}

export default Jobs