import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import TimeTracker from "../../_components/time/TimeTracker";
import WeeklySchedule from "../../_components/time/WeeklySchedule";

const TimePage = async () => {
  const session = await getServerSession(authOptions);
  
    return (
      <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
        <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">Time tracking</h1>
        <h3 className="text-lg text-left pl-6 lg:px-10 md:px-10 my-4">Submit your weekly hours worked</h3>
        {/* <TimeTracker /> */}
        <WeeklySchedule />
      </main>
    );
};

export default TimePage;