import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody, 'req json data in project route')
    const { projectId, userEmail, rate, ...projectInfo } = reqBody;
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    console.log("reqBody in job posting route", projectId)
    const rateNumber = parseInt(rate, 10);
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    })

    console.log(project, 'PROJECT DETAILS')

    let createdProjectUser;

    if (projectId) {
      createdProjectUser = await prisma.projectUsers.create({
        data: {
          rate: rateNumber,
          ...projectInfo,
          project: { 
            connect: { 
              id: project.id 
            } 
          },
          user: { connect: { id: user.id } },
        },
      });
    }


    return NextResponse.json({ createdProjectUser,  message: "Project user created successfully"}, { status: 201 })
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}