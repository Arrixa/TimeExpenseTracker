import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody, 'req json data in project route')
    const { customer, ...projectInfo } = reqBody;
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("reqBody in job posting route", reqBody)


    // Create Customer
    const createdCustomer = await prisma.customer.create({
      data: {
        name: customer,
      },
    });
    
    const createProject = await prisma.project.create({
        data: {
          customer: { connect: { id: createdCustomer.id } },
          client: { connect: { id: clientId } },
          ...projectInfo
        },
        
      });

    return NextResponse.json({ createProject, message: "Project & customer created successfully"}, { status: 201 })
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const postData = await getProjectsData(request);
    // Respond with the post data
    return Response.json(postData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getProjectsData(request: Request) {
  const session = await getServerSession(authOptions);
  const clientId = await session?.clientUser.clientId;
  const projects = await prisma.project.findMany({
    where: {
      clientId: clientId,
    },
    include: {
      customer: true, 
    },
  });

  if (!projects || projects.length === 0) {
    return { message: "No job postings found for this client" };
  }
  return projects;
}


/*
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("reqBody in job posting route", reqBody)

    const { experience, departmentName, jobLevelName, ...jobPost } = reqBody;

    // Retrieve experienceMin and experienceMax
    const experienceRegex = /(\d+)–?(\d+)?/;
    const match = experience.match(experienceRegex);
    const experienceMin = parseInt(match[1], 10);
    const experienceMax = match[2] ? parseInt(match[2], 10) : null;

    // Create Department
    const createdDepartment = await prisma.department.create({
      data: {
        departmentName: departmentName,
        client: { connect: { id: clientId } },
      },
    });

    // Create JobLevel
    const createdJobLevel = await prisma.jobLevel.create({
      data: {
        name: jobLevelName,
        parentLevel: 'parentLevelValue', // replace with actual value
        department: { connect: { id: createdDepartment.id } },
      },
    });

    
    const createJob = await prisma.jobPosting.create({
        data: {
          status: "DRAFT",
          company: { connect: { id: clientId } },
          postedBy: { connect: { id: userId } },
          experienceMin: experienceMin,
          experienceMax: experienceMax,
          department: { connect: { id: createdDepartment.id } },
          jobLevel: { connect: { id: createdJobLevel.id } },
          ...jobPost
        },
        
      });
      return NextResponse.json({ createJob, message: "Job posting created successfully"}, { status: 202 })
    // }
  } catch (error) {
    console.error("Error during creating job posting:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}


*/