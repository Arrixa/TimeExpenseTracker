'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import Link from 'next/link';
import { LayoutGrid, LayoutList, Plus } from 'lucide-react';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Button } from '@/app/components/ui/button';
import ProjectForm from './ProjectForm';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';
import ActivityForm from './ActivityForm';
import ProjectUsersForm from './ProjectUsersForm';
// import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group';

const ProjectsDashboard = () => {
  const [projectsData, setProjectsData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/project');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       } 
  //       const data = await response.json();
  //       setJobsData(data);
  //     } catch (error) {
  //       console.error('Error fetching job data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  console.log(projectsData, 'fetched jobs')

  const projectId = '1'

  return (
    <main className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <Card className='p-2 flex items-center justify-left'>
        <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="flairnowOutline" className='mt-4'>Create a new project</Button>
            </DrawerTrigger>
            <ProjectForm setProjectsData={setProjectsData} />
            
          </Drawer>
          
        </CardContent>
      </Card>
      <Card className='flex items-center justify-between mt-2'>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Manage your projects</CardDescription>
        </CardHeader>
      </Card>
      
      
    </main>
  );
};

export default ProjectsDashboard;

/*

{projectsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {projectsData.map((project: any) => (
            <Link key={project.id} href={`/dashboard/recruitment/projects/${project.id}`}>
              </Link>
              ))}
            </div>
          ) : (
            <Card className=" flex flex-col bg-background py-4 mt-2">
              <CardTitle className="text-4xl p-6 ">Loading...</CardTitle>
              <CardContent>
                <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
              </CardContent>
            </Card>
          )}
*/
