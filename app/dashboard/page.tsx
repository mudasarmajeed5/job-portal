import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteJob from "./DeleteJob";

const Dashboard = async () => {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/auth/signin");
    }

    const [applications, postedJobs] = await Promise.all([
        prisma.application.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                job: {
                    include: {
                        postedBy: true,
                    },
                },
            },
            orderBy: {
                appliedAt: "asc",
            },
        }),
        prisma.job.findMany({
            where: {
                postedById: session.user.id,
            },
            include: {
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                postedAt: "desc",
            },
        }),
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900">
            <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Posted Jobs Section */}
                <div className="md:w-1/2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Posted Jobs</h2>
                        <Link
                            href="/jobs/post"
                            className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                        >
                            Post a Job
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {postedJobs.length === 0 ? (
                            <p className="text-gray-500">You haven t posted any jobs yet.</p>
                        ) : (
                            postedJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-lg shadow p-4 border border-gray-200"
                                >
                                    <h3 className="text-lg font-semibold">{job.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Posted on {new Date(job.postedAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Applications Received:{" "}
                                        <span className="font-bold">{job._count.applications}</span>
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/jobs/${job.id}`}
                                            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                                        >
                                            View Job Details
                                        </Link>
                                        <DeleteJob jobId={job.id} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="md:w-1/2">
                    <h2 className="text-xl font-semibold mb-4">Jobs You Applied To</h2>

                    <div className="space-y-4">
                        {applications.length === 0 ? (
                            <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
                        ) : (
                            applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="bg-white rounded-lg shadow p-4 border border-gray-200"
                                >
                                    <h3 className="text-lg font-semibold">{app.job.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        Company: {app.job.postedBy.name || "N/A"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                                    </p>
                                    <Link
                                        href={`/jobs/${app.job.id}`}
                                        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                                    >
                                        View Job Details
                                    </Link>

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
