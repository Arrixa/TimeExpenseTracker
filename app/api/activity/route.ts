import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody, 'req json data in project route');
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("session user and client id in job posting route", userId, clientId);
    console.log("reqBody in job posting route", reqBody);

    // Ensure reqBody has the `activity` property with at least one element
    if (!Array.isArray(reqBody.activity) || reqBody.activity.length === 0) {
      throw new Error('Activities array is empty or not provided.');
    }

    let ProjectActivity

    // Loop through each activity in the request body
    for (const activityData of reqBody.activity) { // Corrected from reqBody.activities to reqBody.activity
      // Create Activity
      const createActivity = await prisma.activity.create({
        data: {
          name: activityData.name,
          chargable: activityData.chargeable,
        },
      });

      const createProjectActivity = await prisma.projectActivity.create({
        data: {
          chargable: activityData.chargeable,
          activity: { connect: { id: createActivity.id } },
          project: { connect: { id: reqBody.projectId } }, 
        },
      });
      ProjectActivity = {
        ...createActivity,
        ...createProjectActivity,
      }
    }


    return NextResponse.json({ ProjectActivity, message: "Project created successfully" }, { status: 202 });
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
