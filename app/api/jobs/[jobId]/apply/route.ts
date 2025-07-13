import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    const session = await auth();
    const { jobId } = await params;
    if (!session?.user || !session?.user?.id) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
    try {
        const job = await prisma.job.findUnique(
            {
                where: {
                    id: jobId
                }
            }
        )
        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            );
        }
        const existingApplicaton = await prisma.application.findFirst({
            where: {
                jobId: jobId,
                userId: session.user.id,
            }
        })
        if (existingApplicaton) {
            return NextResponse.json({
                message: "You've already applied for this JOB"
            },
                {
                    status: 400,
                })
        }
        const application = await prisma.application.create({
            data: {
                jobId: jobId,
                userId: session.user.id,
                status: "Pending"
            }
        })
        return NextResponse.json(application)
    } catch (error) {
        return NextResponse.json("Internal server error", { status: 500 })
    }
}
