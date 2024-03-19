import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";
import { authOptions } from "@/utils/authOptions";

// FTM-2 FTM-21 12. Validate authorisation

const ValidatingAuth = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const clientUser = session?.clientUser;
  const role = clientUser?.role;

  if ((role && role.includes("EMPLOYEE")) || user.userDomain !== "public") {
    redirect("/dashboard/profile");
  } else if (!role || role.length === 0 || user.userDomain === "public") {
    redirect("/profile");
  } else if (user && user.firstName) {
    redirect("/");
  } else {
    redirect("/auth/signin");
  }

  return (
    <Card className="p-6 my-20 flex items-center justify-center flex-col bg-background w-2/3 lg:w-1/3 mx-auto">
      <CardTitle className="text-4xl py-6 text-center">Loading...</CardTitle>
      <CardDescription className="text-lg text-center">
        Please wait while validating authorisation.
      </CardDescription>
      <CardContent>
        <Skeleton className="w-[200px] h-[40px] rounded-full my-10" />
      </CardContent>
    </Card>
  );
};

export default ValidatingAuth;
