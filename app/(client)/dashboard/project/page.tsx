import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import ProjectForm from "../../_components/project/projectDashboard/ProjectForm";
import ProjectsDashboard from "../../_components/project/projectDashboard/ProjectDashboard";

const EmployeePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
      <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">
        Projects
      </h1>
      <ProjectsDashboard />
    </main>
  );
};

export default EmployeePage;
