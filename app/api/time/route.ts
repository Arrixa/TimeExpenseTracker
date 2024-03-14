import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    console.log("reqBody", reqBody)
    const session = await getServerSession(authOptions);
    const userId = session?.clientUser?.userId
    const timeReport = 
    return NextResponse.json({ timeReport, message: "Time report created successfully"}, { status: 202 })
  } catch (error) {
    console.error("Error during creating time report:", error);
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 });
  }
}