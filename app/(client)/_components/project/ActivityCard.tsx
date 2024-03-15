import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/app/components/ui/drawer';
import ActivityForm from './ActivityForm';
import { Card, CardContent, CardTitle } from '@/app/components/ui/card';
import { Skeleton } from '@/app/components/ui/skeleton';

const ActivityCard = () => {
  const [activitiesData, setActivitiesData] = useState()
  return (
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
  )
}

export default ActivityCard