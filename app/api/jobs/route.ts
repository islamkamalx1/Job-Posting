import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    const data = await req.json();

    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session.user.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {

  try {

    const jobs = await prisma.job.findMany({
      orderBy: {
        postedAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
