import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user || !session?.user?.id) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
    try {
        const data = await req.json();
        const job = await prisma.job.create({
            data: {
                ...data,
                postedById: session.user.id
            }
        })
        return NextResponse.json(job)
    } catch {
        console.log("Error creating a JOB");
        return NextResponse.json("Internal server error", { status: 500 })
    }
}



export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: {
                postedAt: "desc"
            }
        })
        return NextResponse.json(jobs)
    } catch {
        console.log("Error creating a JOB");
        return NextResponse.json("Internal server error", { status: 500 })
    }
}