import SigninButton from "./SigninButton";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import renderLogo from "../common/logos/Logo";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className=" bg-background border-b-4 border-secondary py-2 flex flex-row z-10 top-0 w-full">
      <div className="container flex items-center">
        {session?.clientUser.role ? (
          <Link href="/dashboard/profile">{renderLogo()}</Link>
        ) : (
          <Link href="/">{renderLogo()}</Link>
        )}
      </div>
      <div className="container flex items-center gap-4">
        <div className="flex flex-row ml-auto gap-4">
          <ModeToggle />
          <SigninButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
