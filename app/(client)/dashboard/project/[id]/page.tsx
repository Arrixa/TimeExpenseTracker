'use client'
import ActivityCard from '@/app/(client)/_components/project/ActivityCard';
import ProjectCard from '@/app/(client)/_components/project/ProjectCard';
import ProjectUsersForm from '@/app/(client)/_components/project/ProjectUsersForm';
import { useParams, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react';

const ProjectDetailsPage = ({ params }: any) => {
  
  // Extracting values from the search parameters
  const { id } = useParams();

  return (
    <section className='flex flex-col items-left w-full lg:p-10 md:p-6 p-4'>
      <h1 className="text-3xl text-left font-semibold my-4 pt-8 px-6">Project details</h1>
      <ProjectCard projectId={id} />
      <ActivityCard projectId={id} />
      <ProjectUsersForm projectId={id} />
    </section>
  );
};

export default ProjectDetailsPage;