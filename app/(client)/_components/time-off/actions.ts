'use server'
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
// import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export async function addLeaveRequest(data: any) {
    
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
        return {
            error: 'Login First'
        }
    } else {
        const partner = await prisma.leaveRequest.create({
            data: {
                userId: session?.user.id as string,
                date: data.date,
                leaveType: data.leaveType,
                status: 'pending',
                notes: data.notes,
            }
        })

        // revalidatePath('/admin/partner', 'page')
    }
}

export async function getAllLeaveTypes() {
    // const session = await getServerSession(authOptions);

    const leaveRequestTypes = await prisma.leaveRequestType.findMany();

    return leaveRequestTypes;

}

export async function addLeaveType(data: any) {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
        return {
            error: 'Login First'
        }
    } else {
        const partner = await prisma.leaveRequestType.create({
            data: {
                name: data.name as string,
                updatedBy: session?.user.id as string
            }
        })

        revalidatePath('/dashboard', 'layout')
    }
}
