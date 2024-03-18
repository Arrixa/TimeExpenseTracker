import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import { formatEnum } from "@/lib/formatEnum";
import { ProjectProps } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ProjectProps>[] = [
  {
    accessorKey: 'name',
    header: 'Project Name',
    cell: info => {
      const projectName = info.row.original.name; // Adjust based on your data structure
      const projectId = info.row.original.id; // Adjust based on your data structure   
      return (
        <Link href={`/dashboard/project/${projectId}`}>{projectName}</Link>
      );
    }
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer',
  },
  {
    accessorKey: 'billingMethod',
    header: 'Billing Method',
    cell: info => formatEnum(info.getValue() as string)
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: info => {
      const dateValue = info.getValue() as string | number;
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: info => {
      const dateValue = info.getValue() as string | number;
      const date = new Date(dateValue);
      return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  },
  // ... Add other columns as needed
];
