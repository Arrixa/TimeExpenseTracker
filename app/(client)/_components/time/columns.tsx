"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TimeReportProp = {
    id: string
    project: string
    projectId: string
    activity: string
    activityId: string
    date: string
    hours: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

export const columns: ColumnDef<TimeReportProp>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "activity",
    header: "Activity",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
