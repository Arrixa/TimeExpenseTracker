import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import AdminDashboardForm from '../../_components/dashboard/AdminDashboardForm';

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className='mx-20 w-3/4 lg:1/2 xl:1/2'>
      <h1 className="text-2xl text-left ml-10 font-semibold my-4 pt-8">Company settings</h1>
      <div className='w-full flex flex-start'>
        <Tabs defaultValue="info" className="w-full">
          <TabsList>
            <TabsTrigger value="info" className="info-trigger ml-6">Company information</TabsTrigger>
            <TabsTrigger value="preferences" className="info-trigger">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <AdminDashboardForm />
          </TabsContent>
          <TabsContent value="preferences"></TabsContent>
        </Tabs>
      </div>   
    </main>
  );
};

export default AdminDashboardPage;
