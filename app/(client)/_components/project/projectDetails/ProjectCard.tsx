"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import { Label } from "@/app/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import ActivityForm from "./ActivityForm";
import ActivityCard from "./ActivityCard";
import ProjectUsersForm from "./ProjectUsersForm";
import { ProjectProps } from "@/lib/interfaces";
import { formattedDate } from "@/lib/formattedDate";

const ProjectCard = ({
  id,
  project,
}: {
  id: string;
  project: ProjectProps;
}) => {


  if (!project) {
    return (
      <Card className="p-6 h-fit flex items-center justify-center flex-col bg-background">
        <CardTitle>Project details</CardTitle>
        <CardDescription className="text-lg text-center">
        Loading...
        </CardDescription>
        <CardContent>
          <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5">
      <CardHeader>
        <h1 className="text-3xl text-left font-semibold pt-2">
          Project details - {project.code}
        </h1>
      </CardHeader>
      <div className="flex flex-col md:flex-row justify-between">
        <CardContent className="w-1/2">
          <Label>Project Name:</Label>
          <p className="">{project.name}</p>
          {/* <Card className='p-1 m-1'>{project.name}</Card> */}
        </CardContent>
        <CardContent className="w-1/2">
          <Label>Customer:</Label>
          <p>{project?.customer?.name}</p>
        </CardContent>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <CardContent className="w-1/2">
          <Label>Currency:</Label>
          <p>{project.currency}</p>
        </CardContent>
        <CardContent className="w-1/2">
          <Label>Billing Method:</Label>
          <p>{capitaliseFirstLetter(project.billingMethod)}</p>
        </CardContent>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <CardContent className="w-1/2">
          <Label>Start Date:</Label>
          <p>{formattedDate(project?.startDate)}</p>
        </CardContent>
        <CardContent className="w-1/2">
          <Label>End Date:</Label>
          <p>{formattedDate(project?.endDate)}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProjectCard;

/*
   
  // const [project, setProject] = useState<ProjectProps | null>(null);
  // useEffect(() => {
  //   const fetchProjectDetails = async () => {
  //     try {
  //       const response = await fetch(`/api/project/${id}`);
  //       if (response.ok) {
  //         const projectData: ProjectProps = await response.json();
  //         console.log(projectData)
  //         setProject(projectData);
  //       } else {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching job data:', error);
  //     }
  //   };

  //   if (id) {
  //     fetchProjectDetails();
  //   }
  // }, [id]);   
 */
