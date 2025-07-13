import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
    const session = await auth();
    const { jobId } = await params;
    if (!session?.user || !session?.user?.id) {
        return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
    try {
        const job = await prisma.job.delete(
            {
                where: {
                    id: jobId
                }
            }
        )
        return NextResponse.json(job)
    } catch (error) {
        console.error("Delete Job Error:", (error as Error).message);
        return NextResponse.json(
            { message: "Job not found or internal error" },
            { status: 500 }
        );
    }
}
