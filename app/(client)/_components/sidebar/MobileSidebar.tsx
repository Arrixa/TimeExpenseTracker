'use client'
import {
  LogOut,
  Menu,
} from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Separator } from "@/app/components/ui/separator";
import { SidebarCompProps } from "@/lib/interfaces";
import { CldImage } from 'next-cloudinary';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import { capitaliseFirstLetter } from '@/lib/capitiliseFirstLetter';
import IconRenderer from "./Icons";
import TooltipIconRenderer from "./TooltipIcons";
import { sidebarItems } from "@/lib/sidebarItemsConst";

// FTM-2 / FTM-20 25. Mobile sidebar 
const MobileSidebar: React.FC<SidebarCompProps> = ({ userRoles, session }) => {
  const user = session?.user;
  const router = useRouter();
  const logoUrl = `https://res.cloudinary.com/dsbvy1t2i/image/upload/v1707912829/${user.userDomain}.png`;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.replace('/');
  };
  
    let uniqueRoles: string[] = [];
    let filteredSidebarItems;
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
    // Get all unique roles of the user
    if (userRoles) {
      uniqueRoles = userRoles?.filter((role: string, index: number, roles: string[]) => roles.indexOf(role) === index);
    }
  
    // Filter sidebar items based on the user's roles
    if (sidebarItems) {
      filteredSidebarItems = sidebarItems.filter((item) => uniqueRoles.includes(item.role));
    }
  
    const getIconComponent = (iconName: string) => {
      return <IconRenderer iconName={iconName} />;
    };
  
    const handleItemClick = (label: string) => {
      setSelectedItem(label === selectedItem ? null : label);
    };


  return (
    <Sheet>
    <div className="flex items-center justify-between text-foreground">
      <SheetTrigger className="p-2 hover:scale-125 fixed top-0 left-0">
        <Menu size={24} />
      </SheetTrigger>
        <SheetContent side='left' className="bg-brand flex flex-col justify-between">
          <section>
            <div className="mx-2">
              <Link href='/'>
                <CldImage alt={`${user?.userDomain} logo`} src={logoUrl} width={40} height={40} className="object-cover ml-5 my-2" />
              </Link>
              <span className="text-lg font-bold ml-4">{capitaliseFirstLetter(user?.userDomain)}</span>
            </div>

            {filteredSidebarItems?.map((item, index) => (
              <Link key={index} href={item.href} className=''>
                <div className={`flex items-center py-4 p-2 cursor-pointer hover:bg-muted active:bg-teal-400 ${selectedItem === item.label ? 'bg-muted' : 'hover:bg-muted'} transition-all`}
                  onClick={() => handleItemClick(item.label)}>
                  <>
                      {getIconComponent(item.label)}
                    <span className="ml-2 leading-5">{item.label}</span>
                  </>
                </div>
              </Link>
            ))}
          </section>
          <section>
            <div className="bg-muted h-[100px] pt-2">
              <div className="flex flex-row space-x-2 p-2 ml-4">
                <div className="">
                  <h4 className="text-lg font-sm text-foreground min-w-fit">{`${user?.firstName} ${user?.lastName}`}</h4>
                  <Separator className="text-foreground" />
                  <p className="text-foreground">{`${user?.userDomain ? capitaliseFirstLetter(user?.userDomain) : ''}`}</p>
                </div>
                <div className="flex items-center justify-center">
                  <CldImage alt='profile image' src={user?.image} width={50} height={50} className='rounded-full' />
                </div>
              </div>
            </div>
            <div className="my-4">
              <button className="flex items-center cursor-pointer ml-4" onClick={handleSignOut}>
                <LogOut className="h-5 w-5 hover:scale-125" />
                <span className="ml-2">Sign out</span>
              </button>
            </div>
          </section>
          

        </SheetContent>
    </div>
    </Sheet>
  );
};

export default MobileSidebar;
   