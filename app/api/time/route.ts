import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// day: "Mon",
//       date: "2024-03-18",
//       startTime: "09:00",
//       endTime: "17:00",
//       notes: "",
//       projectId: "cltsgwtmr0004vm8s46bcwejn",
//       activityId: "cltwq243h0003y6u1uze555vn"
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log("reqBody", reqBody)
    const session = await getServerSession(authOptions);
    const userId = session?.clientUser?.userId;

    const { date, startTime, endTime, notes, projectId, activityId } = reqBody;

    // Combine date with startTime and endTime to create DateTime strings
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    // Ensure endTime is after startTime
    if (endDateTime <= startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

     // Calculate hours worked
    const hoursWorked = (endDateTime - startDateTime) / (1000 * 60 * 60);

    const projectActivity = await prisma.projectActivity.findUnique({
      where: {

      }
    })

    const timeReport = await prisma.timeReport.create({ 
      data: { 
        startTime: startDateTime,
        endTime: endDateTime,
        hours: Math.round(hoursWorked),
        notes,
      } 
    });
    return NextResponse.json({ timeReport, message: "Time report created successfully"}, { status: 202 })
  } catch (error) {
    console.error("Error during creating time report:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}