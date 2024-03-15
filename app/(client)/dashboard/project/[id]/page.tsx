'use client'
import ActivityForm from '@/app/(client)/_components/project/ActivityForm';
import { useParams, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react';

const ProjectDetailsPage = ({ params }: any) => {
  
  // Extracting values from the search parameters
  const { id } = useParams();

  return (
    <>
    Hello hi {id}
      <ActivityForm projectId={id} />
    </>
  );
};

export default ProjectDetailsPage;