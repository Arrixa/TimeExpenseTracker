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
  const { id }: { id: string } = useParams();
  console.log(id, 'id in project page')

  return (
    <section className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <ProjectCard id={id} />
      <Card className='md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5 flex flex-col md:flex-row justify-between'>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="flairnowOutline" className='mt-4'>Add activities</Button>
          </DrawerTrigger>
          <ActivityForm id={id} />           
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="flairnowOutline" className='mt-4'>Add project users</Button>
          </DrawerTrigger>
          <ProjectUsersForm id={id} />           
        </Drawer>  
      </Card> 
    </section>
  );
};

export default ProjectDetailsPage;