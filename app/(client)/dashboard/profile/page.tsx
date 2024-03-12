import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import EmployeeProfile from "../../_components/profile/EmployeeProfile";


const EmployeePage = async () => {
  const session = await getServerSession(authOptions);
  
    return (
      <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
        <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">Employee</h1>
        <EmployeeProfile session={session} />
      </main>
    );
};


export default EmployeePage;