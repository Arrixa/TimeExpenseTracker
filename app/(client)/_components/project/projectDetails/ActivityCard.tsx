import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import ActivityForm from "./ActivityForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Label } from "@/app/components/ui/label";

interface Activity {
  id: string;
  name: string;
  chargable: boolean;
}

interface ActivityCardProps {
  id: string;
  activities: Activity[];
  refreshActivities: () => void;
}

const ActivityCard = ({
  id,
  activities,
  refreshActivities,
}: ActivityCardProps) => {
  return (
    <Card className="md:mx-2 my-2 p-2 pt-4 md:p-3 lg:p-5 flex flex-col justify-between align-left">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Project activities</CardTitle>
        <Drawer>
          <DrawerTrigger asChild className="w-1/2">
            <Button variant="flairnowOutline" className="mt-4 w-fit">
              Add activities
            </Button>
          </DrawerTrigger>
          <ActivityForm id={id} onActivityAdded={refreshActivities} />
        </Drawer>
      </CardHeader>
      <>
        {activities?.length > 0 ? (
          <div className="mt-2">
            {activities.map((activity: any) => (
              <CardContent
                key={activity.id}
                className="flex flex-row justify-between"
              >
                <div className="w-1/2">
                  <Label>Activity:</Label>
                  <p>{activity?.activityName}</p>
                </div>
                <div className="w-1/2">
                  <Label>Chargeable:</Label>
                  <p>{activity?.chargable ? "Yes" : "No"}</p>
                </div>
              </CardContent>
            ))}
          </div>
        ) : (
          <>
            <CardContent>
              <p className="text-xl p-2">Loading...</p>
              <Skeleton className="w-[200px] h-[40px] rounded-full my-4" />
            </CardContent>
          </>
        )}
      </>
    </Card>
  );
};

export default ActivityCard;

/*
    <Card className='p-2'>
      <CardContent>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="flairnowOutline" className='mt-4'>Add an activity</Button>
            </DrawerTrigger>
            <DrawerContent>
              <ActivityForm setActivitiesData={setActivitiesData} />
            </DrawerContent>
          </Drawer>
        </CardContent>
        <CardContent>
        {activitiesData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {activitiesData.map((activity: any) => (
              <>
              <p>{activity.name}</p>
              <p>{activity.chargeable}</p>
              </>
            ))}
          </div>
          ) : (
            <>
              <CardContent>
                <p className="text-xl p-2 ">Loading...</p>
                <Skeleton className="w-[200px] h-[40px] rounded-full my-4" />
              </CardContent>
            </>
          )}     
        </CardContent>
    </Card>
    */
