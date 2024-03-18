"use client";
import ActivityCard from "@/app/(client)/_components/project/projectDetails/ActivityCard";
import ProjectCard from "@/app/(client)/_components/project/projectDetails/ProjectCard";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityProps, ProjectProps } from "@/lib/interfaces";
import ProjectUserCard from "@/app/(client)/_components/project/projectDetails/ProjectUserCard";

async function fetchProjectActivities(projectId: string) {
  try {
    const response = await fetch(`/api/project/${projectId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const projects = data.project;
    console.log(projects, "PROJECT DATA");
    return projects;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    throw error;
  }
}

const ProjectDetailsPage = () => {
  // Extracting values from the search parameters
  const { id }: { id: string } = useParams();
  console.log(id, "id in project page");
  const [activity, setActivities] = useState<ActivityProps[]>([]);
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [user, setUsers] = useState([]);

  const refreshActivities = async () => {
    const { activities, users, ...projectDetails } =
      await fetchProjectActivities(id);
    if (projectDetails) {
      setProject({
        ...projectDetails,
      });
      setActivities(activities);
      setUsers(users);
    }
  };

  useEffect(() => {
    refreshActivities();
  }, [id]);

  return (
    <section className="flex flex-col items-left w-full lg:p-10 md:p-6 p-4">
      <ProjectCard id={id} project={project} />
      <ActivityCard
        id={id}
        refreshActivities={refreshActivities}
        activities={activity}
      />
      <ProjectUserCard
        id={id}
        users={user}
        refreshActivities={refreshActivities}
      />
    </section>
  );
};

export default ProjectDetailsPage;
