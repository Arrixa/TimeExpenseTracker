import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody, 'req json data in project route')
    const { projectId, ...projectInfo } = reqBody;
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("session user and client id in job posting route", userId, clientId)
    console.log("reqBody in job posting route", reqBody)

    for (const userData of reqBody.projectUsers) { 
      const createdProjectUser = await prisma.projectUsers.create({
        data: {
          ...projectInfo,
          project: { connect: { id: projectId } },
          user: { connect: { id: userId } },
        },
      });
    };

    

    return NextResponse.json({  message: "Project & customer created successfully"}, { status: 201 })
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}