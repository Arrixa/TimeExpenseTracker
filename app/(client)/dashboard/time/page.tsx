import TimeSheet from "../../_components/time/TimeSheet";
import TimeTracker from "../../_components/time/TimeTracker";
// import WeeklySchedule from "../../_components/time/WeeklySchedule";
import WeeklySchedule from "../../_components/time/Original";

async function fetchProjectActivities() {
  try {
    const response = await fetch('http://localhost:3000/api/project/all');
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    throw error;
  }
}

async function fetchTimeSheet() {
  try {
    const response = await fetch('http://localhost:3000/api/time');
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Failed to fetch time sheet:", error);
    throw error;
  }
}

const TimePage = async () => {
  const allProjects = await fetchProjectActivities();
  const timeSheetData = await fetchTimeSheet()
 
    return (
      <main className="flex flex-col items-left w-full lg:p-10 md:p-6 p-2">
        <h1 className="text-3xl text-left pl-6 lg:px-10 md:px-10 font-semibold my-4 pt-4">Time tracking</h1>
        <h3 className="text-lg text-left pl-6 lg:px-10 md:px-10 my-4">Submit your weekly hours worked</h3>
        {/* <TimeTracker /> */}
        {/* <WeeklySchedule allProjects={allProjects} /> */}
        {/* <WeeklySchedule /> */}
        <TimeSheet allProjects={allProjects} timeSheetData={timeSheetData} />
      </main>
    );
};

export default TimePage;