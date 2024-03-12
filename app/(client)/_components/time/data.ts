type TimeReportProp = {
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
  
  export const timeReport: TimeReportProp[] = [
    {
        id: "728ed52f",
        project: "Project A",
        projectId: "A",
        activity: "Activty 1",
        activityId: "1",
        date: '2024-03-12 11:00:00',
        hours: 10,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        project: "Project A",
        projectId: "A",
        activity: "Activty 2",
        activityId: "2",
        date: '2024-03-11 00:00:00',
        hours: 8,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "728e46h",
        project: "Project B",
        projectId: "B",
        activity: "Activty 1",
        activityId: "1",
        date: '2024-03-8 00:00:00',
        hours: 8,
        status: "pending",
        email: "m@example.com",
      },
  ]
  