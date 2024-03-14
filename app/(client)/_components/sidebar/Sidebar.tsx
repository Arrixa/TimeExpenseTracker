'use client'
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import UserCard from "./UserCard";
import SidebarItemRenderer from "./SidebarItems";
import { SidebarCompProps } from "@/lib/interfaces";
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import { CldImage } from 'next-cloudinary';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"


const SidebarComp: React.FC<SidebarCompProps> = ({ userRoles, session }) => {
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const user = session?.user;
  const logoCloudUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${user.userDomain}.png`;
  const [logoUrl, setLogoUrl] = useState<string>(logoCloudUrl);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1500;
      setIsMenuOpen(isLargeScreen);
      calculateScrollAreaHeight();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    calculateScrollAreaHeight();
  }, [scrollAreaHeight]);
  // FTM-2 / FTM-20 23. Scroll area height
  const calculateScrollAreaHeight = () => {
    if (scrollAreaRef.current) {
      const windowHeight = window.innerHeight;
      const userCardHeight = 120;
      const logoHeight = 167;
      const remainingHeight = windowHeight - userCardHeight - logoHeight;
      setScrollAreaHeight(remainingHeight);
    }
  };
  
  const handleToggleMenu = () => {
      setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const renderSidebarItems = () => {
    return <SidebarItemRenderer userRoles={userRoles} isMenuOpen={isMenuOpen} />;
  };

    // FTM-2 / FTM-20 22. Sidebar component

  return (
    <div className='bg-brand text-foreground relative h-full'>
      <div className={'flex flex-col h-full sticky'} style={{ left: isMenuOpen ? '0' : '-200px', top: '0', bottom: '0', height: '100vh' }}>
        <Link href='/'>
          <CldImage alt={`${user?.userDomain} logo`} src={logoUrl} width={40} height={40} className={`object-cover mt-4 ${isMenuOpen ? 'ml-6' : 'mx-auto'}`} />         
        </Link>
        {/* Dashboard Label */}
        <div className="my-4 ml-6">
          {isMenuOpen ? <span className="text-lg font-bold">{capitaliseFirstLetter(user?.userDomain)}</span> : <></>}
        </div>

        {/* Sidebar Items */}
        <ScrollArea ref={scrollAreaRef} style={{ height: `${scrollAreaHeight}px` }} 
        > 
          {renderSidebarItems()}
        </ScrollArea>

        {/* UserCard */}
        <UserCard session={session} isMenuOpen={isMenuOpen} />

        <div className="my-4 ml-3">
          <TooltipProvider>
              <Tooltip>
              <TooltipTrigger>
                <button
                  className="p-2 hover:scale-125"
                  onClick={handleToggleMenu}
                >
                  {isMenuOpen ? <ChevronsLeft size={24} /> : <ChevronsRight className="mx-auto" size={24} />}
                </button>
                </TooltipTrigger>
              <TooltipContent>{isMenuOpen ? <p>Close menu</p> :  <p>Open menu</p>}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};


export default SidebarComp;
