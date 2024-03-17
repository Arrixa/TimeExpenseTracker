'use client'
import ActivityCard from '@/app/(client)/_components/project/ActivityCard';
import ProjectCard from '@/app/(client)/_components/project/ProjectCard';
import ProjectUsersForm from '@/app/(client)/_components/project/ProjectUsersForm';
import { useParams, useSearchParams } from 'next/navigation';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import ActivityForm from '@/app/(client)/_components/project/ActivityForm';
// import { useEffect, useState } from 'react';

const ProjectDetailsPage = () => {
  
  // Extracting values from the search parameters
  const { id } = useParams();

  return (
    <section className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left font-semibold my-4 pt-8 px-6">Project details</h1>
      <ProjectCard projectId={id} />
      <Card className='flex flex-col md:flex-row justify-between px-4 pb-4 mx-2'>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="flairnowOutline" className='mt-4'>Add activities</Button>
          </DrawerTrigger>
          <ActivityForm projectId={id} />           
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="flairnowOutline" className='mt-4'>Add project users</Button>
          </DrawerTrigger>
          <ProjectUsersForm projectId={id} />           
        </Drawer>  
      </Card> 
    </section>
  );
};

export default ProjectDetailsPage;