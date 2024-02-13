"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { SquareUserRound } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface UserCardProps {
  session?: Session | null, 
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ session }) => {
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const user = session?.user;

  return (
    <div className="mx-auto bg-background h-[100px] w-full py-2">
      {session && session.user ? (
        <div className="flex flex-row space-x-2 p-2 ml-4">
          <div className="">
            <h4 className="text-lg font-sm text-foreground min-w-fit">{`${user.firstName} ${user.lastName}`}</h4>
            <Separator />
            <p className="text-foreground">{`${user.userDomain ? capitalizeFirstLetter(user.userDomain) : ''}`}</p>
          </div>
          <div className="rounded-full w-[60px] h-[60px] flex items-center justify-center">            
                <Avatar>
                  <AvatarImage src={user.image} className='' />
                  <AvatarFallback><SquareUserRound /></AvatarFallback>
                </Avatar> 
          </div>
        </div>
      ) : (
        <>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  )
}
export default UserCard