import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { timeReport } from "../../_components/time/data";
import { columns, TimeReportProp } from '../../_components/time/columns';
import { DataTable } from "@/app/components/ui/data-table";

const TimePage = async () => {
  const session = await getServerSession(authOptions);
  const data = timeReport
  
    return (
      <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
        <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">Time report</h1>
        <DataTable columns={columns} data={data} />
      </main>
    );
};

export default TimePage;