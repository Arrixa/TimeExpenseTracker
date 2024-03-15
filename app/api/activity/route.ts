import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log(reqBody, 'req json data in project route')
    const session = await getServerSession(authOptions);
    const clientId = await session?.clientUser.clientId;
    const userId = await session?.user.id;
    console.log("session user and client id in job posting route", userId, clientId)
    console.log("reqBody in job posting route", reqBody)

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