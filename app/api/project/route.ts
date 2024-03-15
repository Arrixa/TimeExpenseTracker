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
    console.log("session user and client id in job posting route", userId, clientId)
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
          ...projectInfo
        },
        
      });

    // Create Activity
    // const createActivity = await prisma.activity.create({
    //   data: {
    //     name: activities,
    //   },
    // });
    
    //   const createProjectActivity = await prisma.projectActivity.create({
    //     data: {
    //       chargable: billable,
    //       activity: { connect: { id: createActivity.id } },
    //       project: { connect: { id: createProject.id } },
    //     },
    //   })

    // Iterate over the activities array and create each activity
  //   const projectActivitiesPromises = activities.map((activityName) => {
  //     // Create the activity if it doesn't exist and then create the project activity
  //     return prisma.activity.upsert({
  //       where: { name: activityName },
  //       update: {},
  //       create: {
  //         name: activityName,
  //         chargable: billable,
  //       },
  //     }).then(activity => {
  //       // Create ProjectActivity linking the activity to the project
  //       return prisma.projectActivity.create({
  //         data: {
  //           project: { connect: { id: createProject.id } },
  //           activity: { connect: { id: activity.id } },
  //           chargable: billable, 
  //         },
  //       });
  //     });
  //   });

  //   // Execute all promises for creating project activities
  //   return Promise.all(projectActivitiesPromises);
  // });


      return NextResponse.json({ createProject, message: "Project created successfully"}, { status: 202 })
    // }
  } catch (error) {
    console.error("Error during creating project:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}


/*
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("session user and client id in job posting route", userId, clientId)
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

export async function GET(request: Request) {
  try {
    const jobData = await getJobsData(request);
    // Respond with the job data
    return Response.json(jobData);
  } catch (error) {
    console.error("Error during handling GET request:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

async function getJobsData(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session, 'session in job post route')
  const clientId = await session?.clientUser.clientId;
  const jobs = await prisma.jobPosting.findMany({
    where: {
      clientId: clientId,
    },
    include: {
      company: true, 
      department: true,
      jobLevel: true
    },
  });

  if (!jobs || jobs.length === 0) {
    return { message: "No job postings found for this client" };
  }

  // Extract and return the relevant data for each job
  const processedJobs = jobs.map((job: JobCardProps) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    department: job.department,
    location: job.location,
    salary: job.salary,
    jobLevel: job.jobLevel,
    employmentType: job.employmentType,
    workPlace: job.workPlace,
    postedBy: job.postedBy,
    workHours: job.workHours,
    status: job.status,
    skills: job.skills,
    company: job.company,
    positionsNumber: job.positionsNumber,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    experienceMin: job.experienceMin,
    experienceMax: job.experienceMax,
    startDate: job.startDate,
    endDate: job.endDate,
    dueDate: job.dueDate,
    closingDate: job.closingDate,
  }));
  console.log("processedJobs", processedJobs);

  return processedJobs;
}

*/