"use client";
import { Separator } from "@/app/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { UserCardProps } from "@/lib/interfaces";
import { signOut } from "next-auth/react";
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import Link from "next/link";

const UserCard: React.FC<UserCardProps> = ({ session, isMenuOpen }) => {
  const user = session?.user;
  const router = useRouter();

  const cloudinaryBaseURL =
    "https://res.cloudinary.com/dsbvy1t2i/image/upload/";
  const defaultImg = "DefaultProfileImg";
  const cloudinaryImageId = session?.user.image ? session?.user.id : defaultImg;
  const imageUrl = `${cloudinaryBaseURL}v1707912829/${cloudinaryImageId}.png`;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    router.replace("/");
  };

  return (
    <div className="bg-muted h-[100px] flex justify-center">
      {isMenuOpen ? (
        <div className="flex flex-row space-x-2 p-2 ml-4">
          <div className="flex flex-col justify-center">
            <h4 className="text-lg font-sm text-foreground min-w-fit">{`${user?.firstName} ${user?.lastName}`}</h4>
            <Separator className="text-foreground" />
            <p className="text-foreground">{`${
              user?.userDomain ? capitaliseFirstLetter(user?.userDomain) : ""
            }`}</p>
          </div>
          <div className="flex items-center justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="">
                  <CldImage
                    alt="profile image"
                    src={imageUrl}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="m-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center cursor-pointer py-2"
                  >
                    <User className=" hover:scale-125" size={24} />
                    <span className="ml-2">Profile</span>
                  </Link>
                  {/* Sign Out */}
                  <button
                    className="flex items-center cursor-pointer py-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="hover:scale-125" size={24} />
                    {<span className="ml-2">Sign out</span>}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="mx-2">
                <CldImage
                  alt="profile image"
                  src={imageUrl}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <div className="m-2">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center cursor-pointer py-2"
                >
                  <User className=" hover:scale-125" size={24} />
                  <span className="ml-2">Profile</span>
                </Link>
                {/* Sign Out */}
                <button
                  className="flex items-center cursor-pointer py-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="hover:scale-125" size={24} />
                  {<span className="ml-2">Sign out</span>}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
export default UserCard;
// imageUrl ? imageUrl : defaultImg
