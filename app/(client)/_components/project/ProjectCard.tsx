'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Skeleton } from '@/app/components/ui/skeleton';
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { format } from 'date-fns';
import { Label } from '@/app/components/ui/label';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';
import { Button } from '@/app/components/ui/button';
import ActivityForm from './ActivityForm';
import ActivityCard from './ActivityCard';


const ProjectCard = (projectId) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`); 
        if (response.ok) {
          const projectData = await response.json();
          console.log(projectData)
          setProject(projectData);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle fetch error
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
    if (!project || project == null) {
      fetchProjectDetails();
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  console.log(project, 'project data')

  const formattedDate = (dateString) => {
    if(dateString) {
      const date = new Date(dateString);
      return format(date, "y-MM-dd");
    }
  };

  return (
    <>
    <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5'>
      <div className='flex flex-col md:flex-row justify-between'>
        <CardContent className='w-1/2'>
          <Label>Project Name:</Label>
          <p className=''>{project.name}</p>
          {/* <Card className='p-1 m-1'>{project.name}</Card> */}
        </CardContent>
        <CardContent className='w-1/2'>
          <Label>Customer:</Label>
          <p>{project?.customer?.name}</p>
        </CardContent>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <CardContent className='w-1/2'>
          <Label>Project code:</Label>
          <p>{project.code}</p>
        </CardContent>
        <CardContent className='w-1/2'>
        <Label>Currency:</Label>
        <p>{project.currency}</p>
      </CardContent>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <CardContent className='w-1/2'>
          <Label>Start Date:</Label>
          <p>{formattedDate(project?.startDate)}</p>
        </CardContent>
        <CardContent className='w-1/2'>
          <Label>End Date:</Label>
          <p>{formattedDate(project?.endDate)}</p>
        </CardContent>
     
      {/* <CardContent>
        <Label>Billing Method:</Label>
        <p>{capitaliseFirstLetter(project.billingMethod)}</p>
      </CardContent> */}
      </div>

    </Card>
    {/* <ActivityCard /> */}
    </>
  );
};

export default ProjectCard;