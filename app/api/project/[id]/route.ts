import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.url
  // http://localhost:3000/api/project/[object%20Object] Id in get projects
  // const id = request.url.split('/').pop();
  // console.log('Request:', request);
  // console.log('Job ID:', id);
  // const jobId = request.nextUrl.searchParams.get('id');
  // console.log('Job ID from search params:', jobId);
  // const jobId = request.params.id;
  // const { id } = request.params;
  // const { id } = request.query;
  try {
    const projectData = await getProjectData(id as string);
    console.log('project data:', projectData);
    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getProjectData(projectId: string) {
  console.log(projectId, 'Id in get projects')

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      customer: true, 
    },
  });

  if (!project ) {
    return { message: "No projects found for this client" };
  }

  // Extract and return the relevant data for each project
  return {
    ...project
    // id: project.id,
    // name: project.name,
    // code: project.code,
    // billingMethod: project.billingMethod


  // billingMethod   Billing
  // currency        String
  // ProjectUsers    ProjectUsers[]
  // TimeReport      TimeReport[]
  // startDate       DateTime
  // endDate         DateTime
    
  };
}