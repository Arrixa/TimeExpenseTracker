import React from 'react'
import NavBar from '@/app/components/nav/NavBar';

const mainLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <div className="flex w-full">
      <main className="flex-grow">
        <NavBar />
        <div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default mainLayout
