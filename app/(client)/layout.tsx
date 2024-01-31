// Needs to check what the clientId is
// Pass the ClientId to ensure only the information of each client is rendered
// Token is encrypted - use instead of session

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Sidebar from './sidebar/page';

const ClientLayout = async ({ 
  children,
  }: {
    children: React.ReactNode
  }) => {

  // const session = await getServerSession(authOptions);
  
  return (
    <div className="flex">
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
