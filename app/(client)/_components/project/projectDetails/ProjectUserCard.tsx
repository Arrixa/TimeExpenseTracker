import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import ProjectUsersForm from "./ProjectUsersForm";
import { Label } from "@/app/components/ui/label";
import { Skeleton } from "@/app/components/ui/skeleton";
import { formattedDate } from "@/lib/formattedDate";
import { ProjectUserCardProps } from "@/lib/interfaces";

const ProjectUserCard = ({
  id,
  refreshActivities,
  users,
}: ProjectUserCardProps) => {
  console.log(users, "USERS");
  return (
    <Card className="md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5 flex flex-col justify-between align-left">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Project users</CardTitle>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="flairnowOutline" className="mt-4">
              Add project users
            </Button>
          </DrawerTrigger>
          <ProjectUsersForm id={id} onUserAdded={refreshActivities} />
        </Drawer>
      </CardHeader>
      <>
        {users?.length > 0 ? (
          <div className="mt-2">
            {users.map((user: any) => (
              <>
                <CardContent className="flex flex-row justify-between">
                  <div className="w-1/2">
                    <Label>Email:</Label>
                    <p>{user.userEmail}</p>
                  </div>
                  <div className="w-1/2">
                    <Label>Approver:</Label>
                    <p>{user.approver ? "Yes" : "No"}</p>
                  </div>
                  <div className="w-1/2">
                    <Label>Reviewer:</Label>
                    <p>{user.reviewer ? "Yes" : "No"}</p>
                  </div>
                  <div className="w-1/2">
                    <Label>Project period:</Label>
                    <p>
                      {formattedDate(user.startDate)} -{" "}
                      {formattedDate(user.endDate)}
                    </p>
                  </div>
                </CardContent>
              </>
            ))}
          </div>
        ) : (
          <>
            <CardContent>
              <p className="p-2">No project users</p>
              <Skeleton className="w-[200px] h-[40px] rounded-full my-4" />
            </CardContent>
          </>
        )}
      </>
    </Card>
  );
};

export default ProjectUserCard;

/*
approver
: 
true
endDate
: 
"2024-03-30T23:00:00.000Z"
id
: 
"cltwx4wui0000vtmj43f2vdyn"
projectId
: 
"cltsgwtmr0004vm8s46bcwejn"
rate
: 
4
rateBy
: 
"HOUR"
reviewer
: 
true
startDate
: 
"2024-03-18T23:00:00.000Z"
*/
