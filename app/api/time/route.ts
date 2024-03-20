import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {projectActivityId, ...reqBody} = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log('req body:', reqBody, userId)

    if (!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const timeReport = await prisma.timeReport.create({
      data: {
        ...reqBody,
        status: Status.SUBMITTED,
        userId: userId,
        // user: { connect: { id: userId } }, 
      },
    });

    if (timeReport) {
      const projectActivity = await prisma.projectActivity.update({
        where: { id: projectActivityId },
        data: { timeReportId: timeReport.id }
      })
    }
    console.log('Time Submitted Success API')
    return NextResponse.json({ timeReport, message: "Time report created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error during creating time reports:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  try {
    const timeData = await getTimeData(userId as string);
    return NextResponse.json(timeData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}


async function getTimeData(userId: string) {
  const timeReport = await prisma.timeReport.findMany({
    where: { userId: userId },
  });
  console.log('TIME REPORT DATA:', timeReport)
  return timeReport
}