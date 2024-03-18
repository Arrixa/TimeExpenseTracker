import { ColumnDef } from "@tanstack/react-table";
import { formattedDate } from "@/lib/formattedDate";
import { ProjectUserProps } from "@/lib/interfaces"; 
import { formatEnum } from "@/lib/formatEnum";

export const userColumns: ColumnDef<ProjectUserProps>[] = [
  {
    accessorKey: 'userEmail',
    header: 'Email',
  },
  {
    accessorKey: 'approver',
    header: 'Approver',
    cell: info => info.getValue() ? 'Yes' : 'No',
  },
  {
    accessorKey: 'reviewer',
    header: 'Reviewer',
    cell: info => info.getValue() ? 'Yes' : 'No',
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
    // Optionally, you could format the rate if needed, e.g., to add currency
    // cell: info => `${info.getValue()}`,
  },
  {
    accessorKey: 'rateBy',
    header: 'Rate By',
    cell: info => formatEnum(info.getValue() as string)
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: info => formattedDate(info.getValue() as string),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: info => formattedDate(info.getValue() as string),
  },
  // {
  //   accessorKey: 'userId',
  //   header: 'User ID',
  //   cell: info => <a href={`/users/${info.getValue()}`}>{info.getValue()}</a>,
  // },
];
