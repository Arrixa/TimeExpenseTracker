import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import Sidebar from './sidebar/page';
import MenuBar from './_components/navbar/MenuBar';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  const session = await getServerSession(authOptions);
    return (
      <>
        <div className='w-fit'><MenuBar /></div>
        <div className='flex w-full z-10'>
          <Sidebar session={session} />
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </>
    );
  };

export default ClientLayout;
