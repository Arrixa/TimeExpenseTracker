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


    // Loop through each activity in the request body
      // Create Activity
      const createActivity = await prisma.activity.create({
        data: {
          name: reqBody.name,
          chargable: reqBody.chargeable,
        },
      });

      const createProjectActivity = await prisma.projectActivity.create({
        data: {
          chargable: reqBody.chargeable,
          activity: { connect: { id: createActivity.id } },
          project: { connect: { id: reqBody.projectId.projectId } }, 
        },
      });
      const ProjectActivity = {
        ...createActivity,
        ...createProjectActivity,
      }


    return NextResponse.json({ ProjectActivity, message: "Project created successfully" }, { status: 202 });
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
