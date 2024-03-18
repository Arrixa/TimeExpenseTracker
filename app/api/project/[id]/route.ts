import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url.split('/').pop();
  try {
    const projectData = await getProjectData(id as string);
    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getProjectData(projectId: string) {
  // Fetch project activities and their related project and activities details
  const projectActivities = await prisma.projectActivity.findMany({
    where: { projectId },
    include: {
      project: { include: { customer: true } },
      activity: true,
    },
  });

  // Fetch project users and their related user details
  const projectUsers = await prisma.projectUsers.findMany({
    where: { projectId },
    include: { user: true },
  });

  const projectDetails = projectActivities[0]?.project || null;

  // Simplify project activities data
  const simplifiedActivities = projectActivities.map(pa => ({
    id: pa.id,
    activityId: pa.activityId,
    activityName: pa.activity.name,
    chargable: pa.chargable,
  }));

  // Simplify project users data
  const simplifiedUsers = projectUsers.map(pu => ({
    id: pu.id,
    userId: pu.user.id,
    userEmail: pu.user.email,
    rate: pu.rate,
    rateBy: pu.rateBy,
    startDate: pu.startDate,
    endDate: pu.endDate,
    approver: pu.approver,
    reviewer: pu.reviewer,
  }));

  // Construct a simplified project object
  let simplifiedProject = projectDetails ? {
    id: projectDetails.id,
    name: projectDetails.name,
    code: projectDetails.code,
    billingMethod: projectDetails.billingMethod,
    currency: projectDetails.currency,
    startDate: projectDetails.startDate,
    endDate: projectDetails.endDate,
    customer: projectDetails.customer ? {
      id: projectDetails.customer.id,
      name: projectDetails.customer.name,
    } : null,
    activities: simplifiedActivities,
    users: simplifiedUsers,
  } : null;

  // Fallback in case no projectActivity data was found, but there's still a project
  if (!simplifiedProject && !projectActivities.length) {
    simplifiedProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: { customer: true },
    });
  }

  // Return the simplified project data
  return simplifiedProject ? { project: simplifiedProject } : { message: "Project not found" };
}




// async function getProjectData(projectId: string) {
//   console.log(projectId, 'Id in get projects')

//   const projectActivity = await prisma.projectActivity.findMany({
//     where: {
//       projectId: projectId,
//     },
//     include: {
//       project: {
//         include: {
//           customer: true, 
//         }
//       },
//       activity: true
//     },
//   });

//   const projectUser = await prisma.projectUsers.findMany({
//     where: {
//       projectId: projectId,
//     },
//     include: {
//       user: true,
//     }
//   })

//   console.log(projectUser, 'project users')
  
//   let project;

//   project = [
//     projectActivity,
//     projectUser
//   ]
  


//   if (!projectActivity && !projectUser) {
//     project = await prisma.project.findUnique({
//       where: {
//         id: projectId,
//       },
//       include: {
//         customer: true, 
//       }
//     });
//   }

//   // Extract and return the relevant data for each project
//   return {
//     project    
//   };
// }