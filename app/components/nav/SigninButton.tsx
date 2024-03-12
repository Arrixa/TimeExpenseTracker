"use client";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SigninBtnProps } from "@/lib/interfaces";

const SigninButton: React.FC<SigninBtnProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    router.replace("/");
  };

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          {session.user.firstName ? (
            <>
              {session?.user.userDomain !== "public" ? (
                <Button variant="flairnowOutline">
                  <Link href="/dashboard/profile">{`${session.user.firstName}`}</Link>
                </Button>
              ) : (
                <Button variant="flairnowOutline">
                  <Link href="/profile">{`${session.user.firstName}`}</Link>
                </Button>
              )}
              <Button onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Button onClick={handleSignOut}>Sign out</Button>
            </>
          )}
        </>
      ) : (
        <>
          <Button
            className="bg-brand text-black py-2 px-4 rounded hover:bg-teal-700 hover:text-white transition duration-300"
            onClick={() => signIn()}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninButton;
