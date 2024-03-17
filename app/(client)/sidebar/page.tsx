'use client'
import { useEffect, useState } from "react";
import MobileSidebar from "../_components/sidebar/MobileSidebar";
import SidebarComp from "../_components/sidebar/Sidebar";
import { SidebarProps } from "@/lib/interfaces";

const Sidebar: React.FC<SidebarProps> = ({ session }) => {
  const userRoles = session?.role || [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside className="min-h-screen">
     {isMobile ? (
        <MobileSidebar userRoles={userRoles} session={session} />
      ) : (
        <SidebarComp userRoles={userRoles} session={session} />
      )}
    </aside>
  );
};

export default Sidebar;
