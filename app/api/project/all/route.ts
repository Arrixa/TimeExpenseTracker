import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const clientId = await session?.clientUser.clientId;

  try {
    const allProjectData = await getClientProject(clientId as string);
    return NextResponse.json(allProjectData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getClientProject(clientId: string) {
  // Fetch all projects for the given client ID
  const projects = await prisma.project.findMany({
    where: { clientId },
    include: { customer: true } 
  });

  let allActivities = [];
  let allUsers = [];

  // Fetch activities and users for each project
  for (const project of projects) {
    const projectActivities = await prisma.projectActivity.findMany({
      where: { projectId: project.id },
      include: { activity: true },
    });
    const projectUsers = await prisma.projectUsers.findMany({
      where: { projectId: project.id },
      include: { user: true },
    });

    // Simplify and accumulate data
    allActivities.push(...projectActivities.map(pa => ({
      projectId: project.id,
      projectName: project.name,
      ...pa,
      activityName: pa.activity.name,
    })));

    allUsers.push(...projectUsers.map(pu => ({
      projectId: project.id,
      projectName: project.name,
      ...pu,
      userEmail: pu.user.email,
    })));
  }

  // Structure the final response
  const clientProjectsData = {
    projects: projects.map(p => ({
      id: p.id,
      name: p.name,
      code: p.code,
      customer: p.customer ? {
        id: p.customer.id,
        name: p.customer.name,
      } : null,
    })),
    activities: allActivities,
    users: allUsers,
  };

  return clientProjectsData;
}
