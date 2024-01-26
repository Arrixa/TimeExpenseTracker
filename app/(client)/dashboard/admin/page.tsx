import { NextApiRequest, NextApiResponse } from 'next';
import AdminDashboardForm from '../../_components/AdminDashboardForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { checkAccessAndRedirect } from '@/lib/redirects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

const AdminDashboardPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(authOptions);

  // Check access and redirect if needed
  await checkAccessAndRedirect('/admin', session, res);

  return (
    <main className='mx-20'>
      <h1 className="text-2xl text-left ml-4 font-semibold my-4">Company settings</h1>
      <div className='w-full flex flex-start'>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info" className="info-trigger">Company information</TabsTrigger>
            <TabsTrigger value="preferences" className="info-trigger">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="info"><AdminDashboardForm /></TabsContent>
          <TabsContent value="preferences"></TabsContent>
        </Tabs>
      </div>   
    </main>
  );
};

export default AdminDashboardPage;



// import { getServerSession } from "next-auth";
// import React from "react";
// import { authOptions } from "../../../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

// const AdminPage = async () => {
//   const session = await getServerSession(authOptions);
//   const role = session?.clientUser.role
//   if (!session || !session.user) redirect("/auth/signin");
//   // if (!session.role)
//   if (!role || !role.includes('ADMIN' || 'OWNER')) {
//      throw new Error("You do not have authorization to view the admin dashboard. You need to have the user role ADMIN or OWNER.")
//     // console.error("Not authorized, need to have the user role ADMIN or OWNER.", error);
//     // toast.error("You do not have authorization to view the admin dashboard. You need to have the user role ADMIN or OWNER."); 
//   } else {
//     return (
//       <div>
//         <h2>Admin dashboard</h2>
//         {JSON.stringify(session)}
//       </div>
//     );
//   }
// };

// export default AdminPage;