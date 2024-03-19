import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {projectActivityId, ...reqBody} = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log('req body:', reqBody, userId)

    if (!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const timeReport = await prisma.timeReport.create({
      data: {
        ...reqBody,
        status: Status.SUBMITTED,
        userId: userId,
        // user: { connect: { id: userId } }, 
      },
    });

    if (timeReport) {
      const projectActivity = await prisma.projectActivity.update({
        where: { id: projectActivityId },
        data: { timeReportId: timeReport.id }
      })
    }

    return NextResponse.json({ timeReport, message: "Time report created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error during creating time reports:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

//     // Process each time entry and create a TimeReport for each
//     const timeReports = await Promise.all(reqBody.map(async entry => {
//       const { date, startTime, endTime, notes, projectActivityId } = entry;
//       const startDateTime = new Date(`${date}T${startTime}`);
//       const endDateTime = new Date(`${date}T${endTime}`);

//       // Check if end time is earlier than start time, push the date to the next day
//       if (endDateTime <= startDateTime) {
//         endDateTime.setDate(endDateTime.getDate() + 1);
//       }

//       // Calculate hours worked
//       const hoursWorked = (endDateTime - startDateTime) / (1000 * 60 * 60);

//       // Check if projectActivity exists
//       const projectActivityExists = await prisma.projectActivity.findUnique({
//         where: { id: projectActivityId },
//       });

//       const userExists = await prisma.user.findUnique({
//         where: { id: userId },
//       });

//       console.log(startDateTime, endDateTime, hoursWorked, projectActivityExists, userId, userExists)
//     //   if (!projectActivityExists) {
//     //     throw new Error(`Project Activity not found for ID: ${projectActivityId}`);
//     //   }

//     //   // Create TimeReport
//       return prisma.timeReport.create({
//         data: {
//           startTime: startDateTime,
//           endTime: endDateTime,
//           hours: Math.round(hoursWorked),
//           status: Status.SUBMITTED,
//           user: { connect: { id: userId } },
//           // ProjectActivity: { connect: { id: projectActivityId } },
//         },
//       });
//     }));

// export async function POST(req: Request) {
//   try {
//     const reqBody = await req.json();
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id;
    
//     console.log('REQ BODY:', reqBody, userId)


//     // if (!userId) {
//     //   return NextResponse.json(
//     //     { message: "User not authenticated" },
//     //     { status: 401 }
//     //   );
//     // }

//     // Assuming reqBody is an array of time entries
//     // const timeReports = await Promise.all(
//     //   reqBody.map(async (entry) => {
//     //     // Sanitize input to remove null characters
//     //     const notesSanitized = entry.notes.replace(/\0/g, "");

//     //     const startDateTime = new Date(`${entry.date}T${entry.startTime}`);
//     //     const endDateTime = new Date(`${entry.date}T${entry.endTime}`);

//     //     if (endDateTime <= startDateTime) {
//     //       endDateTime.setDate(endDateTime.getDate() + 1);
//     //     }

//     //     const hoursWorked = (endDateTime - startDateTime) / (1000 * 60 * 60);

//     //     // Debugging logs
//     //     console.log(
//     //       "Start:",
//     //       startDateTime,
//     //       "End:",
//     //       endDateTime,
//     //       "Hours:",
//     //       hoursWorked,
//     //       "User ID:",
//     //       userId
//     //     );

//     //     // Create TimeReport
//     //     return prisma.timeReport.create({
//     //       data: {
//     //         startTime: startDateTime,
//     //         endTime: endDateTime,
//     //         hours: 8,
//     //         status: Status.SUBMITTED,
//     //         userId: 'clto3jdbk000012ezl3qrjyt7',
//     //         // Include ProjectActivity connection if needed
//     //       },
//     //     });
//     //   })
//     // );

//     return NextResponse.json(
//       {  message: "Time reports created successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error during creating time reports:", error);
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
